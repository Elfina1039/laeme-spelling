import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Profile, Littera, Slot } from '../classes/profile';
import { ListSearch } from '../classes/general';
import { SetService } from '../services/set.service';
import { InterfaceService } from '../services/interface.service';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.css']
})
export class ProfileSideComponent implements OnInit {
   profile : Profile;
    //profile : Profile;
  @Output("requestHighlight") requestHighlight = new EventEmitter<[ListSearch, string[]]>();
     @ViewChild("wrapper") wrapper : any;
    loaderFnc : string = "getInventory";
    textId : number;
    position : [number, number];
    
  constructor(protected setSvc : SetService,
              protected intfSvc : InterfaceService) {
 
  }

  ngOnInit() {
       console.log(this.wrapper.nativeElement);
      
  }

fetchProfile(id){
    this.textId = id;
     let ref = this;
      this.setSvc.fetchUniversal(ref.loaderFnc,[id]).subscribe((litsData:any)=>{ this.setSvc.fetchUniversal("getSlotsByText",[id]).subscribe((slotsData:any)=>{
          let litterae : Littera[] = ref.processLits(litsData.rows);
           let slots : any = ref.processSlots(slotsData.rows, litterae);
          
          ref.profile = new Profile(litterae, slots.list, slots.ref); console.log(this.profile);});});
}  
    
loadAlternatives(fnc,lit){
   // this.textId = id;
     let ref = this;
      this.setSvc.fetchUniversal(fnc,[lit]).subscribe((litsData:any)=>{   
          let litterae : Littera[] = ref.processLits(litsData.rows);
          ref.profile = new Profile(litterae, [], []); console.log(this.profile);});
}
    

processLits(litsData){
    let litterae : Littera[] = [];
    litsData.forEach((li)=>{
          litterae.push(new Littera(li));  
        });
   return litterae; 
    
}
    
processSlots(slotsData, litObjects){
    let slots : Slot[] = [];
     let slotRef : any = {};
     slotsData.forEach((s)=>{
             let members = s.litterae.map((l)=>l.str);
            let litterae = litObjects.filter((lo)=>members.indexOf(lo.str)!=-1);
            let nSlot=<Slot>{morphid : eval(s.morphid), pos: s.pos, litterae : litterae};
            slots.push(nSlot); 
             slotRef[s.morphid+"-"+s.pos] = nSlot;
        
        });
    return {list: slots, ref: slotRef};
}
     
    
    
toggle(){
    // console.log(this.wrapper);
    if(this.wrapper.nativeElement.style.display=="block"){
        this.close();
        return false;
    }else{
        this.open();
        return true;
    }
         
}     

sortBy(crit){
    console.log("sorting by " + crit);
   let sorted = this.profile.litterae.sort((a,b)=>{return a[crit]>b[crit] ? -1:1});
    this.profile.litterae=sorted;
    
}    
    
close(){
        this.wrapper.nativeElement.style.display="none"; 
} 
    
open(){
    console.log(this.wrapper.nativeElement.style.width);
        this.wrapper.nativeElement.style.display="block"; 
   
}
    
highlightStrid(littera){
    console.log("highlighting");
    let slotList : string[] = this.profile.getSlotList(littera);
    let stridList : number[] = slotList.map((sl)=>eval(sl.split("-")[0]));
    
    console.log(slotList);
    
    let search = new ListSearch({littera:littera.str,fields:[["morphids",""]], color:"", list:stridList});
    
    
    this.requestHighlight.emit([search, slotList]);
}
    

    getShade(x){
        let r:number, g:number, b:number;
        if(x<1){
            r = 255;
            g = 255 * x ;
            b = 255 * x;
        }else{
            g=255;
            r = 255 / x ;
            b = 255 / x;
        }
        
       // let r = (x<1) ? 255 : x;
        //let rgb = (125+ (255*x))>255 ? 255 : (0+ (255*x));
       
        let result = "rgb("+r+","+g+","+b+")";
       //  console.log(x+" => "+result);
        return result;
    }
    
    
}
