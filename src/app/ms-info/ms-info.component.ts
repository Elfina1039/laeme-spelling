import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {expand, appear} from "./../animations";
import { MsMeta } from '../classes/manuscript';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-ms-info',
  templateUrl: './ms-info.component.html',
  styleUrls: ['./ms-info.component.css'],
    animations:[expand, appear]
})
export class MsInfoComponent implements OnInit {
  mss : MsMeta[] = [];
    @ViewChild("wrapper") wrapper : any;
    showInfo : boolean = false;
  constructor(private setSvc : SetService) { }

  ngOnInit() {
  }

    
loadMeta(ids){
    let ref=this;
     this.mss=[]; this.setSvc.fetchUniversal("getMsMeta",ids).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.mss.push(<MsMeta>i);
                           });
         //ref.queryData = data.queryData;
      })
}    
    
    
toggle(){
    // console.log(this.wrapper);
    if(this.showInfo==true){
        this.close();
        this.showInfo = false;
    }else{
        this.open();
       this.showInfo = true;
    }
         
}     

    
    
close(){
        this.wrapper.nativeElement.style.display="none"; 
} 
    
open(){
    console.log(this.wrapper.nativeElement.style.width);
        this.wrapper.nativeElement.style.display="block"; 
   
}
    
redirectToLaeme(link){  window.open("http://archive.lel.ed.ac.uk/ihd/laeme2_scripts/find_msdescriptor.php?idno="+link);
}
    
}
