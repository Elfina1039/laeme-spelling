import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ProfileSideComponent } from '../profile-side/profile-side.component';
import { SetService } from '../services/set.service';
import { InterfaceService } from '../services/interface.service';

import { LitteraExtended, Littera } from '../classes/profile';

@Component({
  selector: 'app-lit-inventory',
  templateUrl: './lit-inventory.component.html',
  styleUrls: ['./lit-inventory.component.css']
})
export class LitInventoryComponent extends ProfileSideComponent implements OnInit {
loaderFnc : string = "getInventoryExtended";
@ViewChild("itemList") itemList : any;

    @Output() requestItem : EventEmitter<any> = new EventEmitter();
    
  constructor(setSvc : SetService,
              intfSvc : InterfaceService) {
  super(setSvc, intfSvc);
  }

  ngOnInit() {
            
  }
    
    
    processLits(litsData){
    let litterae : Littera[] = [];
    litsData.forEach((li)=>{
          litterae.push(new LitteraExtended(li));  
        });
   return litterae; 
    
}
    
loadSlots(lit){
    let id = this.textId;
    this.itemList.loadItems("getRareSlots", id+";"+lit);
    let itemWrapper = this.itemList.wrapper.nativeElement;
    let ref = this;
    this.intfSvc.moveComponent(itemWrapper,ref);
    
    
} 
    

    
submitItem(e){
    this.requestItem.emit(e);
}
    


}
