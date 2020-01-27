import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
    
  constructor(private setSvc : SetService) { }

  ngOnInit() {

      
  }
    
    
loadSplits(morphid){
      this.splits.loadSplitsByMorphid(morphid);
}
    
    
loadItemsByLits(lits){
     let ref = this;
    let litList=lits.join(",");
      this.setSvc.fetchUniversal("getSlotsByLits",[litList]).subscribe((data:any)=>{
          console.log(data);
          data.forEach((i)=>{
                           ref.items.push(<Item>i);
                           });
      })
    
} 

}
