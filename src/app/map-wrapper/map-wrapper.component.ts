import { Component, OnInit, ViewChild,ViewChildren, Input} from '@angular/core';
import { SetService } from '../services/set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LitStats, Set } from '../classes/profile';
import {  SearchFnc, MapSearch } from '../classes/general';
import { GraphicService } from '../services/graphic.service';
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
//@ViewChild("setList") setList : any;

    laemeData : any = [];
    previousSearches : MapSearch[] = [];
    litStats : LitStats[];
    selectedText : any = {id:0};
    sets : Set[] = [];
    params : any = {};
    
    searchFncs : SearchFnc[] = [
        {label:"Map set+", fnc : "mapSet"},
        {label:"Map set", fnc : "mapSetExact"}
    ]
    
  constructor(protected route: ActivatedRoute, protected router : Router , private setSvc : SetService,  private graphicSvc: GraphicService) { }

  ngOnInit() {
      
     let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let fnc : string=p.get('fnc');
        let args : string[]=p.get('args').split(";");
   
    ref.loadMap(fnc,args);
           
           ref.params={fnc:fnc, args:args};
           
           

      });  
      
      
  }

mapItem(e){
    this.changeMap({fnc:"mapSlot", args: [e.strid,e.pos]});
}
    
mapSelection(e){
    this.changeMap({fnc:"mapSlots", args:[e.join(",") ]});
}
    
mapSearch(e){
    this.changeMap({fnc:e.fnc, args:[e.search.main]});
}
    
changeMap(e){
    console.log("changing map");
    console.log(e);
       this.router.navigate(["/map",e.fnc, e.args.join(";")]); 
 }
    
    
loadMap(fnc,args){
    let ref = this;
    this.graphicSvc.addFilter(ref.wrapper.nativeElement);
    this.graphicSvc.addFilter(ref.setList.nativeElement);
   
    
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          ref.laemeData=data;
        this.setSvc.fetchUniversal(fnc+"Stats",args).subscribe((data:any)=>{
          console.log(data);
          ref.litStats=data;
       
        ref.map.makeColorKey(ref.litStats);
       let newLayer = ref.map.addLaemeData(ref.laemeData);
            
        ref.previousSearches.push({label:fnc, fnc:fnc, args:args, layer:newLayer});
      })
      })
    this.loadSets("getSetsByLits",args);
    
}
    

    loadSets(fnc, args){
     let ref = this;
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          ref.sets=[];
          data.forEach((s)=>{
            
                           ref.sets.push(new Set(s));
                           
                           });
        ref.graphicSvc.removeFilter(ref.setList.nativeElement);
        ref.graphicSvc.removeFilter(ref.wrapper.nativeElement);
        
      })

}
    
    

displayMs(e){
    console.log("displaying ");
    this.selectedText.id=e.id;
   // let lits = e.litterae.map((ls)=>ls.str).join(",");
    let args = this.params.args[0];
    let fnc = this.params.fnc+"ForText";
    this.itemList.loadItems(fnc, [e.id,args]);
    this.itemList.filters.push({type:"ms", values:[e.id]});
} 
    
    
    
}
