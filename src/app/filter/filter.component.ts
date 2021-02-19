import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FilterDataService } from '../services/filter-data.service';
import {  Filter, OptionSet, Option } from '../classes/general';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private data : FilterDataService) { }
        @Input("filter") filter : Filter;
     @Input("filterGroup") filterGroup : string = "";
    @ViewChild("content") content;
      optionSets : OptionSet[];
    
  ngOnInit() {
      let setsIds = this.filter.optionSets;
      this.optionSets = this.data.getOptionSets(setsIds);
      
      console.log(this.optionSets);
      
  }
    
    updateFilter(os){
    this.filter.values = os.options.filter((o)=>o.checked==true).map((ch)=>ch.tag);;
    }
    
    getElement(id){
        return document.getElementById(id);
    }

 
}
