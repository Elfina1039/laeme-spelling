import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    morphid : number;
    pos : number = -1;
     @ViewChild("wrapper") wrapper : any;
       @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
    
  constructor(protected setSvc : SetService,
              protected route : ActivatedRoute) { }

  ngOnInit() {
  }

    
loadSplits(fnc : string, args : string, filters : string="", reset: boolean = true){
    console.log("NEW POS: "+this.pos);
    this.morphid = parseInt(args);
    
    if(reset==true){
        this.splits=[];
    }
    
     let ref = this;
  
      this.setSvc.fetchUniversal(fnc,[args,filters]).subscribe((data:any)=>{
         // console.log(data);
          data.rows.forEach((i)=>{
                           ref.splits.push(<Split>i);
             // console.log(i);
                           });
        //  console.log(ref.splits);
          this.cmpLoaded.emit();
      })
    
}
    
loadSourceForms(langs){
    let args = [this.morphid.toString(), langs.join(",")].join(";");
    this.loadSplits("getSourceSplits", args,"" ,false);
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
