import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { Set, Littera, Item } from '../classes/profile';
import { QueryData, Filter, SearchFnc } from '../classes/general';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {
    sets : Set[] = [];
    filtered : Set[] = [];
    queryData : QueryData;
    searchFncs : SearchFnc[] = [{label:"Advanced search", fnc:"getFilteredSets"},
                               {label:"Search", fnc:"getSetsByLits"}];
    
    @Input("searchMode") searchMode : string = "advanced";
    @ViewChild("wrapper") wrapper;
    
    @Output() requestItem : EventEmitter<any> = new EventEmitter();
    
    @Output() requestSelection : EventEmitter<any> = new EventEmitter();
    
  constructor(private setSvc : SetService) { }

  ngOnInit() {
      
      
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
