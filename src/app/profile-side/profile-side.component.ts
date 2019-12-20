import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Profile } from '../classes/profile';
import { ListSearch } from '../classes/general';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.css']
})
export class ProfileSideComponent implements OnInit {
   @Input("profile") profile : Profile;
  @Output("requestHighlight") requestHighlight = new EventEmitter<[ListSearch, string[]]>();
     @ViewChild("wrapper") wrapper : any;
  constructor() { }

  ngOnInit() {
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
    
    let search = new ListSearch({fields:[["strid",""]], color:"yellow", list:stridList});
    
    
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
