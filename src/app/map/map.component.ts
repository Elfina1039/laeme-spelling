import { Component, OnInit, ViewChild, Output, EventEmitter,  Input } from '@angular/core';
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    lat : number = 0;
    lang : number = 0;
    map : any;
    colorKey : any = {};
    msKey : any = {};
   // @Input()litStats : LitStats[];
    @ViewChild("map") mapContainer : any;
    @Output() msClicked : EventEmitter<number> = new EventEmitter();
    
    
  constructor(private graphicSvc : GraphicService) { }

  ngOnInit() {
    this.initializeMap(); 

     
  }
    
    makeColorKey(litStats){
         let ref = this;
        ref.colorKey=[];
          litStats.forEach((ls,lsi)=>{
        console.log(ls.str+"="+ref.graphicSvc.colors[lsi]);
        ref.colorKey[ls.str]=ref.graphicSvc.colors[lsi]});  
      console.log(this.colorKey);
      
    }
    
    initializeMap(){
     let ref = this;
        let target = this.mapContainer.nativeElement;
        
   
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
    
//this.addLaemeData(this.graphicSvc.dataSample);
        
    }
    

addLaemeData(mapData){
    console.log("ADDING");
     let ref = this;     
    let features : Feature[] = [];
    
    mapData.forEach((md)=>{
        features.push(this.createFeature(md));
    });
    
    
        let vectorSrc = new VectorSource({
            features:features
        });
        
         let vectorLayer = new Vector({
            source : vectorSrc
        });    
        
        this.map.addLayer(vectorLayer);
  
   // console.log(this.map.getLayers());
}
    

    createFeature(f){
        
        let feature = new Feature({
            geometry: new Point(fromLonLat([this.graphicSvc.grid[f.id].long, this.graphicSvc.grid[f.id].lat]))
        });
        
       // console.log(feature);
        
        this.msKey[feature.ol_uid]=f.id;
    
     let pie=this.graphicSvc.drawPie(f.litterae,f.tokens, this.colorKey);
        
        feature.setStyle(new Style({
            image: new Icon({
                img : pie,
                crossOrigin : "anonymous",
                imgSize : [20,20]
            })
        }));
   
   return feature; 
} 
    
    
displayMs(id){
    console.log(id);
    this.msClicked.emit(id);
}
    
    
   

  
}
