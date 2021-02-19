import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Title, TitleMs } from '../classes/manuscript';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-texts-list',
  templateUrl: './texts-list.component.html',
  styleUrls: ['./texts-list.component.css']
})
export class TextsListComponent implements OnInit {
 titles : Title[] = [];
    @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
  constructor(private setSvc : SetService) { }

  ngOnInit() {
      this.loadTitles();
  }
    
    loadTitles(){
    let ref=this;
     this.titles=[]; this.setSvc.fetchUniversal("getTitles",[]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.titles.push(<Title>i);
                           });

         ref.cmpLoaded.emit();
      })
}   

}
