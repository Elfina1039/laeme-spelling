import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  SearchFnc } from '../classes/general';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    search : any = {main:""};
    @Input("functions") functions : SearchFnc[];
    @Output() requestSearch : EventEmitter<any> = new EventEmitter();
    
  constructor() { }

  ngOnInit() {
  }
    
    submitSearch(search, fnc){
        this.requestSearch.emit({search:search, fnc:fnc});
    }

}
