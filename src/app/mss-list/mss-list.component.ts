import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsMeta } from '../classes/manuscript';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-mss-list',
  templateUrl: './mss-list.component.html',
  styleUrls: ['./mss-list.component.css']
})
export class MssListComponent implements OnInit {
 mss : MsMeta[] = [];
    @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();

  constructor(private setSvc : SetService) { }

  ngOnInit() {
      this.loadMeta();
  }
    

loadMeta(){
    let ref=this;
     this.mss=[]; this.setSvc.fetchUniversal("getAllMss",[]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.mss.push(<MsMeta>i);
                           });
         console.log(ref.mss);
         ref.cmpLoaded.emit();
      })
}   
    
showData(){
    console.log(this.mss);
}
    
    redirectToLaeme(link){  window.open("http://archive.lel.ed.ac.uk/ihd/laeme2_scripts/find_msdescriptor.php?idno="+link);
}
    

}

