import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SplitsComponent } from '../splits/splits.component';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-split-editor',
  templateUrl: './split-editor.component.html',
  styleUrls: ['./split-editor.component.css']
})
export class SplitEditorComponent extends SplitsComponent implements OnInit {

patternString : string = "";
    
  constructor(setSvc : SetService,
              route: ActivatedRoute) {
    super(setSvc, route);
  }

  ngOnInit() {
      let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let morphid : string=p.get('morphid');
    
    ref.loadSplits("getSplitsEditByMorphid", morphid, "");

      });  
      
  }
    
    
reAnalyse(s){
    s.split = s.form.replace(/(\s$)/," _").replace(/^\s/,"_ ").replace(/\s{2}/," _ ").split(" ");
    console.log(s.split);
    s.changed=true;
}   
    
saveLitterae(){
    let ref = this;
    
    this.splits.filter((sp)=>sp.changed)
        .forEach((s)=>ref.setSvc.fetchUniversal("saveLitterae",[s.split,ref.morphid,ref.patternString]).subscribe((data:any)=>{
          console.log(data);
       
      }));
}
    

}
