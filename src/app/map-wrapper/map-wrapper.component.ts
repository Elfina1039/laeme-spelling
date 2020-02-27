import { Component, OnInit, ViewChild,ViewChildren, Input} from '@angular/core';
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
//@ViewChild("setList") setList : any;

    laemeData : any = [];
   // previousSearches : MapSearch[] = [];
    litStats : LitStats[];
    selectedText : any = {id:0};
   // sets : Set[] = [];
    params : any = {};
     queryData : QueryData;
    searchLabel : string;
    
    searchMode : string = "advanced";
     setSearchMode : string = "none";
    searchFncs : SearchFnc[][] = [
       [ {label:"Map set+", fnc : "mapSet"}],
        [ {label:"Map filtered", fnc : "mapfilteredSet"}]

    ]
    
    filters : string[] = [
        
    ]
    
  constructor(protected route: ActivatedRoute, protected router : Router , private setSvc : SetService,  private graphicSvc: GraphicService,  private memorySvc : MemoryService) { }

  ngOnInit() {
      
     let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let fnc : string=p.get('fnc');
        let args : string[]=p.get('args').split(";");
   
    ref.loadMap(fnc,args);
           
         
          
           

      });  
      
      
  }

mapItem(e){
    this.changeMap({fnc:"mapSlot", args: [e.morphid,e.pos]});
}
    
mapSelection(e){
    this.changeMap({fnc:"mapSlots", args:[e.join(",") ]});
}
    
mapSearch(e){
   let args : string[] = [e.search.main, e.filters];
    console.log(args);
    this.changeMap({fnc:e.fnc, args:args});
}
    
changeMap(e){
    console.log("changing map");
    console.log(e);
       this.router.navigate(["/map",e.fnc, e.args.join(";")]); 
 }
    
    
loadMap(fnc,args){
    let ref = this;
    //this.graphicSvc.addFilter(ref.wrapper.nativeElement);
   // this.graphicSvc.addFilter(ref.setList.nativeElement);
      ref.params={fnc:fnc, args:args};
           if(!ref.searchLabel){
                ref.searchLabel = fnc;
           }
    
    
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          ref.laemeData=data.rows;
          ref.queryData=data.queryData;
        this.setSvc.fetchUniversal(fnc+"Stats",args).subscribe((data:any)=>{
          console.log(data);
          ref.litStats=data.rows;
       
        ref.map.makeColorKey(ref.litStats);
       let newLayer = ref.map.addLaemeData(ref.laemeData);
            
        ref.memorySvc.mapSearches.unshift({label:ref.searchLabel, fnc:fnc, args:args, layer:newLayer});
        
            
        ref.setList.loadSets(ref.queryData.fnc,args);
      })
      })
    
    
}
    
    switchLayer(ps){
        this.map.placeLayer(ps.layer);
    }
    


    
    

displayMs(e){
    console.log("displaying ");
    this.selectedText.id=e.id;
    this.msInfo.loadMeta([e.id]);
    this.msInfo.toggle();
   // let lits = e.litterae.map((ls)=>ls.str).join(",");
    let args = this.params.args[0];
    let fnc = this.params.fnc+"ForText";
    let filters = JSON.stringify(this.queryData.filters);
    this.itemList.loadItems(fnc, [e.id,args,filters]);
   // this.itemList.queryData.filters.push({type:"ms", values:[e.id]});
} 
    
    
    
}
