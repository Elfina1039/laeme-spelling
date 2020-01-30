import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Littera, Item, Slot } from '../classes/profile';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
     items : Item[] = [];
    @ViewChild("splits") splits : any;
    @Output() mapItem : EventEmitter<any> = new EventEmitter();
    
  constructor(private setSvc : SetService) { }

  ngOnInit() {

      
  }
    
    
loadSplits(morphid){
      this.splits.loadSplitsByMorphid(morphid);
}
    
    
loadItems(fnc,args){
    this.items = [];
     let ref = this;
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          data.forEach((i)=>{
                           ref.items.push(<Item>i);
                           });
      })
    
} 
    
requestMap(item){
    console.log("requesting map for " + item.strid);
    this.mapItem.emit({fnc:"mapSlot",args:[item.strid, item.pos]});
}
    
    
  

}
