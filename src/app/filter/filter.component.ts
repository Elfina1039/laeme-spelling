import { Component, OnInit, Input } from '@angular/core';
import { FilterDataService } from '../services/filter-data.service';
import {  Filter, OptionSet } from '../classes/general';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private data : FilterDataService) { }
        @Input("filter") filter : Filter;
      optionSets : OptionSet[];
    
  ngOnInit() {
      let setsIds = this.filter.optionSets;
      this.optionSets = this.data.getOptionSets(setsIds);
      
  }
    
    updateFilter(os){
    this.filter.values = os.options.filter((o)=>o[1]==true).map((ch)=>ch[0]);;
    }

 
}
