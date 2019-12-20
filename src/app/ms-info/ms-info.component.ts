import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MsMeta } from '../classes/manuscript';

@Component({
  selector: 'app-ms-info',
  templateUrl: './ms-info.component.html',
  styleUrls: ['./ms-info.component.css']
})
export class MsInfoComponent implements OnInit {
 @Input("msMeta") msMeta : MsMeta;
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
    
redirectToLaeme(link){
    console.log(this.msMeta);
    window.open("http://archive.ling.ed.ac.uk/ihd/laeme2_scripts/search_cross_ref.php?fieldVal="+link);
}
    
}
