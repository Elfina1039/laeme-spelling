import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  SearchFnc, Filter } from '../classes/general';
import { FilterDataService } from '../services/filter-data.service';
import { SearchBoxComponent } from '../search-box/search-box.component';


@Component({
  selector: 'app-search-box-advanced',
  templateUrl: './search-box-advanced.component.html',
  styleUrls: ['./search-box-advanced.component.css']
})
export class SearchBoxAdvancedComponent extends SearchBoxComponent implements OnInit {
  mainFilters : Filter[];
    preFilters : Filter[];
    postFilters : Filter[];
    textFilters : Filter[];
    
    displayFilters : boolean = true;
    
  constructor(filterData : FilterDataService) {
  super(filterData);
  }

  ngOnInit() {
      
    this.mainFilters = this.filterData.getFilters("main");
      
      this.preFilters = this.filterData.getFilters("pre");
     this.postFilters =  this.filterData.getFilters("post");
      this.textFilters =  this.filterData.getFilters("text");
  }
    
    
      submitSearch(search, fnc){
        let activeFilters = this.groupFilters();
        
        let filterJson : string = JSON.stringify(activeFilters);
        console.log(activeFilters);
        this.requestSearch.emit({search:search, fnc:fnc, filters:filterJson});
    }
    
    
    groupFilters(){
        let all : Filter[] = [...this.mainFilters, ...this.preFilters, ...this.postFilters, ...this.textFilters];
            
        let result : Filter[] = all.filter((a)=>a.values.length>0);
        
        if(this.search.text){
            let textId = this.search.text;
            result.push({level:"m",
                        field:"text_id",
                        operator:"=",
                        values:textId});
        }
        
          if(this.search.pre){
            let pre = this.search.pre;
            result.push({level:"l",
                        field:"pre",
                        operator:"=",
                        values:pre});
        }
        
         if(this.search.post){
            let post = this.search.post;
            result.push({level:"l",
                        field:"post",
                        operator:"=",
                        values:post});
        }
        
        return result;
    }


}
