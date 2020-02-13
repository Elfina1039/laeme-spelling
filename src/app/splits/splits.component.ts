import { Component, OnInit, Input } from '@angular/core';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-splits',
  templateUrl: './splits.component.html',
  styleUrls: ['./splits.component.css']
})
export class SplitsComponent implements OnInit {
    patern : string[];
    splits :  string[][]=[];
    pos : number = -1;
  constructor(private setSvc : SetService) { }

  ngOnInit() {
  }

    
loadSplits(fnc, args){
    console.log("NEW POS: "+this.pos);
    this.splits=[];
     let ref = this;
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.splits.push(i.split);
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
