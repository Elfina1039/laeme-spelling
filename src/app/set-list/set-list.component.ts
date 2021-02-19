import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import {appear, addItems, fullScreen} from "./../animations";
import { Set, Littera, Item } from '../classes/profile';
import { QueryData, Filter, SearchFnc } from '../classes/general';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css'],
    animations:[appear, addItems, fullScreen]
})
export class SetListComponent implements OnInit {
    sets : Set[] = [];
    filtered : Set[] = [];
    queryData : QueryData = {fnc:"", args:"", filters:[], getJsonFilters:function(){return ""}};
    
        viewMode : string= "default";
    
    @Input("itemAction") itemAction : string;
    @ViewChild("wrapper") wrapper;
    @ViewChild("content") content;
    
    @Output() requestItem : EventEmitter<any> = new EventEmitter();
    
    @Output() requestSelection : EventEmitter<any> = new EventEmitter();
     @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
    
  constructor(private setSvc : SetService) { }

  ngOnInit() {
 
      
  }
    
    toggleFullScreen(){
    if(this.viewMode=="default"){
         this.viewMode = "full";
    }else{
         this.viewMode = "default";
    }
   
    console.log(this.viewMode);
} 
  
fetchAll(){
     let ref = this;
      this.setSvc.fetchUniversal("getSetsOverview",[]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((s)=>{
                           ref.sets.push(new Set(s));
                           });
          ref.queryData = new QueryData(data.queryData);
          
          ref.filtered = ref.sets;
          ref.cmpLoaded.emit();
      })

}    
    
loadSets(fnc, args, filters=""){
     let ref = this;
    this.filtered = [];
    this.sets = [];
    
      this.setSvc.fetchUniversal(fnc,[args, filters]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((s)=>{
                           ref.sets.push(new Set(s));
                           
                           });
           ref.queryData = new QueryData(data.queryData);
           ref.filtered = ref.sets.filter((s)=>s.members.length>1);
          ref.cmpLoaded.emit();
      })

}
    
filterSets(littera){
    console.log("checking for "+littera);
    this.filtered = this.sets.filter((s)=>s.checkForLittera(littera));
}
    
submitItem(e){
    this.requestItem.emit(e);
}

submitSelection(e){
    this.requestSelection.emit(e);
}
    
setSearch(e){
    console.log(e.filters);
   
    this.loadSets(e.fnc,e.search.main, e.filters);
}

}
