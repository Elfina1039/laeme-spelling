import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SetService } from '../services/set.service';
import { Split } from '../classes/profile';

@Component({
  selector: 'app-splits',
  templateUrl: './splits.component.html',
  styleUrls: ['./splits.component.css']
})
export class SplitsComponent implements OnInit {
    pattern : string[];
    splits :  Split[];
    args : number;
    pos : number = -1;
     @ViewChild("wrapper") wrapper : any;
    
  constructor(protected setSvc : SetService) { }

  ngOnInit() {
  }

    
loadSplits(fnc, args, filters){
    console.log("NEW POS: "+this.pos);
    this.args = args;
    this.splits=[];
     let ref = this;
  
      this.setSvc.fetchUniversal(fnc,[args,filters]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.splits.push(<Split>i);
                           });
      })
    
} 
    
highlightPos(i:number){

    if(i==this.pos-1){
   
        return "white";
        
    }
    else{
        return "#df8f17";
    }
}
    
    
}
