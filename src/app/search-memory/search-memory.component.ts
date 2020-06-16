import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MemoryService } from '../services/memory.service';

@Component({
  selector: 'app-search-memory',
  templateUrl: './search-memory.component.html',
  styleUrls: ['./search-memory.component.css']
})
export class SearchMemoryComponent implements OnInit {

      @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
    
  constructor(private memorySvc : MemoryService) { }

  ngOnInit() {
      this.cmpLoaded.emit();
  }

    jsonFilters(f){
        return JSON.stringify(f);
    }
    
}
