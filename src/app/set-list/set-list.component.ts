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
  constructor(private setSvc : SetService) { }

  ngOnInit() {
      let ref = this;
      this.setSvc.fetchSets().subscribe((data:any)=>{
          console.log(data);
          data.sets.forEach((s)=>{
                           ref.sets.push(new Set(s));
                           });
      })
      
      
  }

}
