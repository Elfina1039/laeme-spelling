import { Component, OnInit, ViewChildren } from '@angular/core';
import { ManuscriptService } from '../services/manuscript.service';
import { MemoryService } from '../services/memory.service';
import { Manuscript, MsSize } from '../classes/manuscript';
import { Search } from '../classes/general';
import { Profile } from '../classes/profile';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ms-tools',
  templateUrl: './ms-tools.component.html',
  styleUrls: ['./ms-tools.component.css']
})




export class MsToolsComponent implements OnInit {
    mss : Manuscript[] = [];
    @ViewChildren("msComponent") msComponents : any;
    preloaded : string[] = [];
    msSize : MsSize = {width:0, height:90, unit: "%"};
    search : Search = new Search({fields : [["lexel",""]], color:"#80ff00"});

  constructor(private msService : ManuscriptService, 
               private memorySvc : MemoryService,
               protected route: ActivatedRoute) { 
     
      this.msSize.unit = "%";
      console.log(this.msSize);
  }

  ngOnInit() {
      let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let texts : string[]=p.get('id').split(",");
        ref.preloaded = texts;
    ref.msSize.width = 100/ref.preloaded.length;
      ref.msSize.height = 100;
           console.log("LOADING MS");
      texts.forEach((pl)=>ref.loadMs(pl));
    

      });
      
      
     
      
  }

    
loadMs(id){
   // this.preloaded.push(id);
     let ref = this;
      this.msService.fetchMs(id).subscribe((data:any)=>
                                           ref.mss.push(new Manuscript(data.rows,id)));
      console.log(this.mss);
    
}  
    
    addField(){
        this.search.fields.push(["lexel",""]);
    }
    
     removeField(){
        this.search.fields.pop();
    }
    
    searchMss(search){
      //  let search = this.search;
        search.color = this.search.color;
        this.memorySvc.msSearches.push(search);
        console.log(this.msComponents);
        this.msComponents._results.forEach((ms)=>ms.highlightToken(search));
        
    }
    
      markAlternatives(slotList : string[]){
          console.log(slotList);
    this.msComponents._results.forEach((ms)=>ms.profile.getAlternatives(slotList));
        
    }
    
    
     clearMss(){
        this.msComponents._results.forEach((ms)=>ms.clear());   
    }
    
    alignMss(line){
        console.log(line);
    this.msComponents._results.forEach((ms)=>{let mscore = ms.ms.compareLines(line); 
                            ms.highlightLine(mscore);});
    
     }
    
     compareProfiles(profile){
        console.log(profile);
         let selection = this.msComponents._results.filter((ms)=>ms.showProfile);
    selection.forEach((subject)=>{
        subject.profile.reset();
        selection.forEach((reference)=>{
            if(subject!=reference){
                 subject.profile.compare(reference.profile.litterae);
            }
           
           
    });
           
    });
    
     }
    
    
}
