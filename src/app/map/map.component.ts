import { Component, OnInit, ViewChild, Output, EventEmitter,  Input} from '@angular/core';
import Map from 'ol/Map';
import {Tile, Vector} from 'ol/layer';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import {fromLonLat} from "ol/proj.js";

import {click, pointerMove, altKeyOnly} from 'ol/events/condition';
import Select from 'ol/interaction/Select';

import { GraphicService } from '../services/graphic.service';
import { LitStats } from '../classes/profile';
import { MapSearch } from '../classes/general';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    lat : number = 0;
    lang : number = 0;
    map : any;
    @Input("mapHeader") mapHeader : string;
    colorKey : any = {};
    freqRange : [number,number] = [0,0];
    msKey : any = {};
    mapData :any = [];
    activeLayer : string = "";
    filledSpots : any = {};
    @Input("previousSearches") previousSearches : MapSearch[];
   // @Input()litStats : LitStats[];
    @ViewChild("map") mapContainer : any;
    @ViewChild("wrapper") wrapper : any;
    @Output() msClicked : EventEmitter<number> = new EventEmitter();
     @Output() mapInitialized : EventEmitter<number> = new EventEmitter();
    
    
  constructor(private graphicSvc : GraphicService) { }

  ngOnInit() {
    
    this.initializeMap(); 

     
  }
    
    
    
    initializeMap(){
     let ref = this;
        let target = this.mapContainer.nativeElement;
        
    let mapHeight = this.wrapper.nativeElement.clientHeight*0.95;
        
 
    this.mapContainer.nativeElement.style.height = mapHeight+"px";
         this.mapContainer.nativeElement.style.width = mapHeight+"px";
        
   
    this.map = new Map({
        target:target,
        layers: [
          new Tile({
            source: new OSM()
          })
        ],
        view: new View({
          center:[-194590.27690666082, 6922353.877221172],
          zoom: 7
        })
      });
  
        
    let select=new Select({condition:click});
        
    this.map.addInteraction(select);
    select.on('select', function(e) {
      ref.displayMs(ref.msKey[e.selected[0]["ol_uid"]]);
    });    
    
        console.log(this.map);
//this.addLaemeData(this.graphicSvc.dataSample);
     this.mapInitialized.emit();   
    }
    

addLaemeData(mapData){
    console.log("ADDING");
    this.mapData = mapData;
    //console.log(this.map);
    let tokenFreqs = mapData.map((m)=>m.tokens);
    let max = Math.max(...tokenFreqs);
    let min = Math.min(...tokenFreqs);
    this.freqRange=[min,max];
    
    console.log(max);
   let newLayer = this.drawMap();
  return newLayer;
   // console.log(this.map.getLayers());
}
    drawMap(){
       
          let ref = this;  
        this.graphicSvc.addFilter(ref.wrapper.nativeElement);
    this.filledSpots = {};
    let features : Feature[] = [];
    
    this.mapData.forEach((md)=>{
        features.push(this.createFeature(md));
    });
    
    
        let vectorSrc = new VectorSource({
            features:features
        });
        
         let vectorLayer = new Vector({
            source : vectorSrc
        }); 
        
        this.placeLayer(vectorLayer);
    
       
    
   this.graphicSvc.removeFilter(ref.wrapper.nativeElement);
        return vectorLayer;
    }
    
    
    placeLayer(vectorLayer){
        let layers = this.map.getLayers();
         let oldLayer=layers.array_.filter((l)=>l["ol_uid"]==this.activeLayer);
        
        if(oldLayer){
           this.map.removeLayer(oldLayer[0]);
           };
        
        this.map.addLayer(vectorLayer);
        this.activeLayer=vectorLayer["ol_uid"];
    }

    createFeature(f){
        let ref = this;
        let shift : number = 0;
        let spot : string = this.graphicSvc.grid[f.id].long.toString()+this.graphicSvc.grid[f.id].lat.toString();
        if(this.filledSpots[spot]){
            shift = 0.01*this.filledSpots[spot];
           // console.log("SHIFTING "+ spot + " / "+parseFloat(this.graphicSvc.grid[f.id].lat+shift) + "("+this.filledSpots[spot]+")");
        }else{
            this.filledSpots[spot]=0;
        }
        let feature = new Feature({
            geometry: new Point(fromLonLat([parseFloat(this.graphicSvc.grid[f.id].long+shift), parseFloat(this.graphicSvc.grid[f.id].lat+shift)]))
        });
        
        this.filledSpots[spot]++;
       // console.log(feature);
        
        this.msKey[<any>feature["ol_uid"]]=f;
    
     let pieSize= this.graphicSvc.calcPieSize(ref.freqRange[0],ref.freqRange[1],f.tokens);
     let pie=this.graphicSvc.drawPie(f.litterae,f.tokens,pieSize/2, this.colorKey);
        //console.log(pie);
        
        feature.setStyle(new Style({
            image: new Icon({
                img : pie,
                crossOrigin : "anonymous",
                imgSize : [pieSize,pieSize]
            })
        }));
   
   return feature; 
} 
    
 colorChange(v){
     this.colorKey[v.key]=v.value;
     console.log(this.colorKey);
 }
    
    
displayMs(id){
    console.log(id);
    
    this.msClicked.emit(id);
}
    
    
   

  
}
