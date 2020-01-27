import { Component, OnInit } from '@angular/core';
import { Set, Littera, Item } from '../classes/profile';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {
    sets : Set[] = [];
    filtered : Set[] = [];
  constructor(private setSvc : SetService) { }

  ngOnInit() {
     this.fetchText(8);
      
      
  }
  
fetchAll(){
     let ref = this;
      this.setSvc.fetchUniversal("getSetsOverview",[]).subscribe((data:any)=>{
          console.log(data);
          data.forEach((s)=>{
                           ref.sets.push(new Set(s));
                           });
          ref.filtered = ref.sets;
      })

}    
    
fetchText(id){
     let ref = this;
      this.setSvc.fetchUniversal("getSetsByText",[id]).subscribe((data:any)=>{
          console.log(data);
          data.forEach((s)=>{
            
                           ref.sets.push(new Set(s));
                           
                           });
           ref.filtered = ref.sets;
      })

}
    
filterSets(littera){
    console.log("checking for "+littera);
    this.filtered = this.sets.filter((s)=>s.checkForLittera(littera));
}
    

}
