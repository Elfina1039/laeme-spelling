import { Component, OnInit } from '@angular/core';
import { Set, Littera, Item } from '../classes/profile';
import { QueryData, Filter } from '../classes/general';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {
    sets : Set[] = [];
    filtered : Set[] = [];
    queryData : QueryData;
  constructor(private setSvc : SetService) { }

  ngOnInit() {
      
      
  }
  
fetchAll(){
     let ref = this;
      this.setSvc.fetchUniversal("getSetsOverview",[]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((s)=>{
                           ref.sets.push(new Set(s));
                           });
          ref.queryData = data.queryData;
          ref.filtered = ref.sets;
      })

}    
    
loadSets(fnc, args){
     let ref = this;
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((s)=>{
                           ref.sets.push(new Set(s));
                           
                           });
          ref.queryData = data.queryData;
           ref.filtered = ref.sets.filter((s)=>s.members.length>1);
      })

}
    
filterSets(littera){
    console.log("checking for "+littera);
    this.filtered = this.sets.filter((s)=>s.checkForLittera(littera));
}
    

}
