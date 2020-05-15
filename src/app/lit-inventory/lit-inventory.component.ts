import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ProfileSideComponent } from '../profile-side/profile-side.component';
import { SetService } from '../services/set.service';
import { InterfaceService } from '../services/interface.service';

import { LitteraExtended, Littera, Profile } from '../classes/profile';
import { ManuscriptService } from '../services/manuscript.service';

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
              intfSvc : InterfaceService,
              msSvc : ManuscriptService) {
  super(setSvc, intfSvc, msSvc);
  }

  ngOnInit() {
            
  }
    
fetchCompared(id, compared){
    this.textId = id;
   
    compared = compared.join(",");
     let ref = this;
      this.setSvc.fetchUniversal("getInventoryCompared",[id,compared]).subscribe((litsData:any)=>{ this.setSvc.fetchUniversal("getSlotsByText",[id]).subscribe((slotsData:any)=>{
          let litterae : Littera[] = ref.processLits(litsData.rows);
           let slots : any = ref.processSlots(slotsData.rows, litterae);
          
          ref.profile = new Profile(litterae, slots.list, slots.ref, id); console.log(this.profile);
        ref.msSvc.msProfiles.push(ref.profile);
      });});
 
    
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
