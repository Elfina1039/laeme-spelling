import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SetService } from '../services/set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LitStats } from '../classes/profile';

@Component({
  selector: 'app-map-wrapper',
  templateUrl: './map-wrapper.component.html',
  styleUrls: ['./map-wrapper.component.css']
})
export class MapWrapperComponent implements OnInit {
@ViewChild("map") map : any;
    laemeData : any = [];
    litStats : LitStats[];
    
  constructor(protected route: ActivatedRoute, private setSvc : SetService) { }

  ngOnInit() {
      
     let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let fnc : string=p.get('fnc');
        let args : string[]=p.get('args').split(";");
   
    ref.loadMap(fnc,args);
           
           

      });  
      
      
  }

    
loadMap(fnc,args){
    let ref = this;
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          ref.laemeData=data;
        this.setSvc.fetchUniversal(fnc+"Stats",args).subscribe((data:any)=>{
          console.log(data);
          ref.litStats=data;
       
        ref.map.makeColorKey(ref.litStats);
       ref.map.addLaemeData(ref.laemeData);
      })
      })
    
}    
    
    

displayMs(e){
    console.log("displaying "+e);
}    
    
}
