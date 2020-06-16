import { Component, OnInit, ViewChild,ViewChildren, Input, AfterContentInit, ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import { MapWrapperComponent } from '../map-wrapper/map-wrapper.component';
import { MapComponent } from '../map/map.component';

import { SetService } from '../services/set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LitStats, Set } from '../classes/profile';
import {  SearchFnc, MapSearch, QueryData, Filter } from '../classes/general';
import { GraphicService } from '../services/graphic.service';
import { MemoryService } from '../services/memory.service';

@Component({
  selector: 'app-map-sequence',
  templateUrl: './map-sequence.component.html',
  styleUrls: ['./map-sequence.component.css']
})
export class MapSequenceComponent extends MapWrapperComponent implements OnInit {

    sequence : any = [];
    maps : MapComponent[] = [];
    extent : number = 0;
     @ViewChild("container", {read: ViewContainerRef}) container;
    
  constructor(route: ActivatedRoute,  
               router : Router ,
               setSvc : SetService, 
               graphicSvc: GraphicService,  
               memorySvc : MemoryService,
              private resolver : ComponentFactoryResolver) {
  super(route, router, setSvc, graphicSvc, memorySvc);
  }

  ngOnInit() {
      
        let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let extent : number = parseInt(p.get('extent'));
        let fnc : string=p.get('fnc');
        let args : string=p.get('args');
        let filters : string=p.get('filters');
           
           console.log("Map sequence Initt " + extent);
           console.log(args);
           ref.extent = extent;
    
    ref.loadMap(fnc,args,extent,filters);

      });  
      
      
  }
    
    
loadMap(fnc,args,extent,filters=""){
    
        let ref = this;
    //this.graphicSvc.addFilter(ref.wrapper.nativeElement);
   // this.graphicSvc.addFilter(ref.setList.nativeElement);
      ref.params={fnc:fnc, args:args, filters:filters};
      
    
      this.setSvc.fetchUniversal(fnc,[args, filters]).subscribe((data:any)=>{
          console.log(data);
          ref.laemeData=data.rows;
          ref.sequence = ref.sequenceData(extent);
          ref.queryData=data.queryData;
        this.setSvc.fetchUniversal(fnc+"Stats",[args, filters]).subscribe((data:any)=>{
          console.log(data);
          ref.litStats=data.rows;
         ref.legendHeader = data.queryData.legend;
         ref.makeColorKey(ref.litStats);
            
        ref.generateMaps();    
            
        let parsedFilters : Filter[];    
            try{
                parsedFilters = JSON.parse(filters);
            }
            catch(error){
                parsedFilters = [];
            }
            
            let label : string;
            if(!ref.searchLabel){
                label = fnc;
           }else{
               label = ref.searchLabel;
               ref.searchLabel="";
           }

      
      })
      })
}
    
sequenceData(extents){
let ref = this;
let i = 0; 
let result = [];    
let tags = [1,2,3,4,5,6,7,8];    
while(i+extents<8){
    let extent = tags.slice(i, i+extents);
    
   let selection = this.laemeData.filter((t)=>ref.graphicSvc.dates[t.id].filter(dt => extent.includes(dt)).length>0);
    result.push(selection);
    i = i+extents;
     console.log(selection);
} 
   
return result;    
}
    
generateMaps(){
    let ref = this;
this.sequence.forEach((s)=>ref.addMap(s));
    this.cmpLoaded.emit();
}
    
addMap(data){
    console.log("adding new map");
    let ref = this;
  
    let mapFactory = ref.resolver.resolveComponentFactory(MapComponent);

    let newMap = this.container.createComponent(mapFactory)._component;
   
    newMap.mapInitialized.subscribe((e)=>{newMap.addLaemeData(data);});

    newMap.colorKey=ref.colorKey;
    newMap.mapHeader = "header";
    //let newLayer = newMap.addLaemeData(data);   

 
   // ref.inventories.push(newInventory);

this.maps.push(newMap);
}
}
