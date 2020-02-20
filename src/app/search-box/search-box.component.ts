import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  SearchFnc, Filter } from '../classes/general';
import { FilterDataService } from '../services/filter-data.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    search : any = {main:""};
    @Input("functions") functions : SearchFnc[];
    @Input("filters") filters : string[];
    @Output() requestSearch : EventEmitter<any> = new EventEmitter();
    
  
  constructor(protected filterData : FilterDataService) { }

  ngOnInit() {
     
  }
    
    submitSearch(search, fnc){
       
        this.requestSearch.emit({search:search, fnc:fnc, filters:[]});
    }

}
