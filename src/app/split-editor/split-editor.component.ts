import { Component, OnInit} from '@angular/core';
import { SplitsComponent } from '../splits/splits.component';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-split-editor',
  templateUrl: './split-editor.component.html',
  styleUrls: ['./split-editor.component.css']
})
export class SplitEditorComponent extends SplitsComponent implements OnInit {


    
  constructor(setSvc : SetService) {
    super(setSvc);
  }

  ngOnInit() {
  }
    
    
reAnalyse(s){
    s.split = s.form.replace(/\s$/," _").replace(/\s{2}/," _ ").split(" ");
    console.log(s.split);
}   
    
saveLitterae(){
    let ref = this;
    
    this.splits //.filter((sp)=>sp.form.indexOf(" ")!=-1)
        .forEach((s)=>ref.setSvc.fetchUniversal("saveLitterae",[s.split,ref.args,ref.pattern]).subscribe((data:any)=>{
          console.log(data);
       
      }));
}
    

}
