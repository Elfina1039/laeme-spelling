import { Component, OnInit, ViewChild,ViewChildren, Input, Output, EventEmitter} from '@angular/core';
import { SetService } from '../services/set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LitStats, Set } from '../classes/profile';
import {  SearchFnc, MapSearch, QueryData, Filter } from '../classes/general';
import { GraphicService } from '../services/graphic.service';
import { MemoryService } from '../services/memory.service';

@Component({
  selector: 'app-map-wrapper',
  templateUrl: './map-wrapper.component.html',
  styleUrls: ['./map-wrapper.component.css']
})
export class MapWrapperComponent implements OnInit {
@ViewChild("map") map : any;
@ViewChild("itemList") itemList : any;
@ViewChild("setList") setList : any;
@ViewChild("wrapper") wrapper : any;
@ViewChild("msInfo") msInfo : any;
@ViewChild("selectedContent") selectedContent : any;
//@ViewChild("setList") setList : any;
    @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();

    laemeData : any = [];
   // previousSearches : MapSearch[] = [];
    litStats : LitStats[];
    legendHeader : string;
    colorKey : any = {};
    selectedText : any = {id:0, litterae:""};
   // sets : Set[] = [];
    params : any = {};
     queryData : QueryData;
    searchLabel : string;
  
    searchMode : string = "advanced";
     setSearchMode : string = "none";
    searchFncs : SearchFnc[][] = [
       [ {label:"Set", fnc : "mapSet"},
       {label:"Strict set", fnc : "mapSetExact"}],
        [ {label:"Map", fnc : "mapfilteredSet"}]

    ]
    
    filters : string[] = [
        
    ]
    
  constructor(protected route: ActivatedRoute,
               protected router : Router , 
               protected setSvc : SetService, 
               protected graphicSvc: GraphicService,  
               protected memorySvc : MemoryService) { }

  ngOnInit() {
   
     let ref = this;
     
      this.msInfo.showInfo=true;
      
       this.route.paramMap.subscribe(function(p){
        let fnc : string=p.get('fnc');
        let args : string=p.get('args');
        let filters : string=p.get('filters');

          ref.loadMap(fnc,args,filters);


      });  
      
       this.map.mapInitialized.subscribe((e)=>{
           if(ref.params=={}){
               ref.cmpLoaded.emit();
           }
           
       });
      
  }

makeColorKey(litStats){
        this.colorKey = this.graphicSvc.makeColorKey(litStats);
    }    
    
mapItem(e){
    console.log(e);
    this.changeMap({fnc:"mapSlot", args: e.morphid+"-"+e.pos, filters:""});
}
    
mapSelection(e){
    this.changeMap({fnc:"mapSlots", args:e.join(","), filters:"" });
}
    
mapSearch(e){
   let args : string = e.search.main;
    console.log(args);
    this.changeMap({fnc:e.fnc, args:args, filters:e.filters});
}
    
changeMap(e){
    console.log("changing map");
    console.log(e);
       this.router.navigate(["/map",e.fnc, e.args, e.filters]); 
 }
    
    
loadMap(fnc,args, filters=""){
    let ref = this;
    //this.graphicSvc.addFilter(ref.wrapper.nativeElement);
   // this.graphicSvc.addFilter(ref.setList.nativeElement);
      ref.params={fnc:fnc, args:args, filters:filters};
      
    
      this.setSvc.fetchUniversal(fnc,[args, filters]).subscribe((data:any)=>{
          console.log(data);
          ref.laemeData=data.rows;
          ref.queryData=data.queryData;
        this.setSvc.fetchUniversal(fnc+"Stats",[args, filters]).subscribe((data:any)=>{
          console.log(data);
          ref.litStats=data.rows;
         ref.legendHeader = data.queryData.legend;
            
       
        ref.makeColorKey(ref.litStats);
            ref.map.colorKey = ref.colorKey;
       let newLayer = ref.map.addLaemeData(ref.laemeData);
            ref.cmpLoaded.emit();
            
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

        ref.memorySvc.mapSearches.unshift({label:label, fnc:fnc, args:args, filters:parsedFilters ,layer:newLayer });
        
            console.log(ref.memorySvc.mapSearches);
            
        ref.setList.loadSets(ref.queryData.fnc,args,filters);
            
      })
      })
    
    
}
    
    switchLayer(ps){
        this.map.placeLayer(ps.layer);
    }
    


displayMs(e){
    console.log("displaying ");
    this.selectedText.id=e.id;
    this.selectedText.litterae =  e.litterae.map((l)=>l.str+'/'+l.tokens).join(", ");
    this.msInfo.loadMeta([e.id]);
    this.msInfo.open();
   // let lits = e.litterae.map((ls)=>ls.str).join(",");
    let args = e.id+";"+this.params.args;
    let fnc = this.params.fnc + "ForText";
 
    let filters = JSON.stringify(this.queryData.filters);
    this.itemList.loadItems(fnc, args,filters);
   // this.itemList.queryData.filters.push({type:"ms", values:[e.id]});
} 
    

    makeSequence(){
        let ps = this.params;
        this.router.navigate(["/map-seq/2",ps.fnc,ps.args]);
    }
    
    
    
}
