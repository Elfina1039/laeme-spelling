import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileSideComponent } from '../profile-side/profile-side.component';
import { SetService } from '../services/set.service';

import { LitteraExtended, Littera } from '../classes/profile';

@Component({
  selector: 'app-lit-inventory',
  templateUrl: './lit-inventory.component.html',
  styleUrls: ['./lit-inventory.component.css']
})
export class LitInventoryComponent extends ProfileSideComponent implements OnInit {
loaderFnc : string = "getInventoryExtended";
@ViewChild("itemList") itemList : any;    
    
  constructor(setSvc : SetService) {
  super(setSvc);
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
    this.itemList.loadItems("getRareSlots", [id, lit]);
    
}    
 

}
