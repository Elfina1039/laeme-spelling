import { Component, OnInit, ViewChild,ViewChildren, Input } from '@angular/core';
import { SetService } from '../services/set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LitStats, Set } from '../classes/profile';

@Component({
  selector: 'app-map-wrapper',
  templateUrl: './map-wrapper.component.html',
  styleUrls: ['./map-wrapper.component.css']
})
export class MapWrapperComponent implements OnInit {
@ViewChild("map") map : any;
@ViewChild("itemList") itemList : any;
//@ViewChild("setList") setList : any;

    laemeData : any = [];
    litStats : LitStats[];
    selectedText : any = {id:0};
    sets : Set[] = [];
    params : any = {};
    
  constructor(protected route: ActivatedRoute, protected router : Router , private setSvc : SetService) { }

  ngOnInit() {
      
     let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let fnc : string=p.get('fnc');
        let args : string[]=p.get('args').split(";");
   
    ref.loadMap(fnc,args);
           
           ref.params={fnc:fnc, args:args};
           
           

      });  
      
      
  }
    
    
changeMap(e){
    console.log("changing map");
    console.log(e);
       this.router.navigate(["/map",e.fnc, e.args.join(";")]); 
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
    this.loadSets("getSetsByLits",args);
    
}
    

    loadSets(fnc, args){
     let ref = this;
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          data.forEach((s)=>{
            
                           ref.sets.push(new Set(s));
                           
                           });
        
      })

}
    
    

displayMs(e){
    console.log("displaying ");
    this.selectedText.id=e.id;
   // let lits = e.litterae.map((ls)=>ls.str).join(",");
    let args = this.params.args[0];
    let fnc = this.params.fnc+"ForText";
    this.itemList.loadItems(fnc, [e.id,args]);
}    
    
}
