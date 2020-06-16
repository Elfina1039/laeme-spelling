import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MemoryService } from '../services/memory.service';

@Component({
  selector: 'app-stored-lists',
  templateUrl: './stored-lists.component.html',
  styleUrls: ['./stored-lists.component.css']
})
export class StoredListsComponent implements OnInit {

    selected : number = 0;
    @Output() requestList : EventEmitter<any> = new EventEmitter();
    
  constructor(private memorySvc : MemoryService) { }

  ngOnInit() {
  }
    
    submitList(il){
        console.log(il);
        this.requestList.emit(il);
    }

}
