import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
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
    
    @Output() mapSet : EventEmitter<any> = new EventEmitter();
  
    @Output() requestItem : EventEmitter<any> = new EventEmitter();
    @Output() requestSelection : EventEmitter<any> = new EventEmitter();
    
    
  constructor(private setSvc: SetService) { }

  ngOnInit() {
      
  }
    
calcBorder(tokens){
    let border : any = Math.round((tokens/this.set.tokens)* 15);
    return <string>border+"px";
}
    
showItems(){
    if(this.itemList.items.length==0){
        let lits : string = this.set.membersStrings.join(",");
    this.itemList.loadItems("getSlotsByLits",[lits]);
    }
    else{
        this.itemList.show();
    }
    
}

hideItems(){
        this.itemList.hide();
    }
    
requestMap(){
    let lits : string = this.set.membersStrings.join(",");
    console.log("requesting" + lits);
    this.mapSet.emit({fnc:"mapSetExact", args:[lits]});
}

submitItem(e){
    this.requestItem.emit(e);
}
    
submitSelection(e){
    this.requestSelection.emit(e);
}
    
    
   

}
