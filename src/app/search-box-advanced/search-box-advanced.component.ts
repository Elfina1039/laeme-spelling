import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  SearchFnc, Filter, SetSearch } from '../classes/general';
import { FilterDataService } from '../services/filter-data.service';
import { SearchBoxComponent } from '../search-box/search-box.component';



@Component({
  selector: 'app-search-box-advanced',
  templateUrl: './search-box-advanced.component.html',
  styleUrls: ['./search-box-advanced.component.css']
})

export class SearchBoxAdvancedComponent extends SearchBoxComponent implements OnInit {
    
   search : SetSearch = new SetSearch();
    displayFilters : boolean = true;
    
  constructor(filterData : FilterDataService) {
  super(filterData);
  }

  ngOnInit() {
      
    this.search.mainFilters = this.filterData.getFilters("main");
      
      this.search.preFilters = this.filterData.getFilters("pre");
     this.search.postFilters =  this.filterData.getFilters("post");
      this.search.msFilters =  this.filterData.getFilters("text");
  }
    
    
      submitSearch(search, fnc){
       let toSubmit = this.search.toSubmit(fnc);
        this.requestSearch.emit(toSubmit);
    }
    
    
  


}
