import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Set, Littera, Item, Slot } from '../classes/profile';
import { SetService } from '../services/set.service';


@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
    @Input("set") set : Set;
    @ViewChild("itemList") itemList : any;
    items : Item[] = [];
    
    
  constructor(private setSvc: SetService) { }

  ngOnInit() {
      
  }
    
calcBorder(tokens){
    let border : any = Math.round((tokens/this.set.tokens)* 15);
    return <string>border+"px";
}
    
loadItems(){
    this.itemList.loadItemsByLits(this.set.membersStrings);
}
    
    
   

}
