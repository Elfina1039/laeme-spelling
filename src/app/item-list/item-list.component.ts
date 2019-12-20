import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Littera, Item, Slot } from '../classes/profile';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
    @Input("items") items : Item[];
    @ViewChild("splits") splits : any;
  constructor() { }

  ngOnInit() {

      
  }
    
    
loadSplits(strid){
          this.splits.pattern = ["C","V","C"];
      this.splits.splits = [["f","y","r"],["f","e","r"],["f","u","r"]];
}

}
