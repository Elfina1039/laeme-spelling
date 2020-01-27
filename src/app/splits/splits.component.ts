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
  constructor(private setSvc : SetService) { }

  ngOnInit() {
  }

    
loadSplitsByMorphid(morphid){
    this.splits=[];
     let ref = this;
      this.setSvc.fetchUniversal("getSplitsByMorphid",[morphid]).subscribe((data:any)=>{
          console.log(data);
          data.forEach((i)=>{
                           ref.splits.push(i.split);
                           });
      })
    
}     
    
    
}
