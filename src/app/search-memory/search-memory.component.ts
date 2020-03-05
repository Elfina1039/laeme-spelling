import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../services/memory.service';

@Component({
  selector: 'app-search-memory',
  templateUrl: './search-memory.component.html',
  styleUrls: ['./search-memory.component.css']
})
export class SearchMemoryComponent implements OnInit {

  constructor(private memorySvc : MemoryService) { }

  ngOnInit() {
  }

    jsonFilters(f){
        return JSON.stringify(f);
    }
    
}
