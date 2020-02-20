import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Manuscript, MsSize, MsLine } from '../classes/manuscript';
import { Search, ListSearch } from '../classes/general';
import { Profile } from '../classes/profile';
import { ManuscriptService } from '../services/manuscript.service';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-ms',
  templateUrl: './ms.component.html',
  styleUrls: ['./ms.component.css']
})
export class MsComponent implements OnInit {
    @Input("ms") ms : Manuscript;
    @Input("msSize") msSize : MsSize;
    @Output() requestAlign = new EventEmitter<MsLine>();
    @Output() requestComparison = new EventEmitter<string>();
    @Output() requestSearch = new EventEmitter<Search>();
    @Output() requestAlternatives = new EventEmitter<string[]>();
    
    @ViewChild("wrapper") wrapper : any;
    @ViewChild("msInfo") msInfo : any;
    @ViewChild("profileCmp") profileCmp : any;
    
    showInfo : boolean = false;
    showProfile : boolean = false;
    profile : Profile ;
    searchResults : [string, number][]=[];
    lineWidth : number;

  constructor(private msService : ManuscriptService,
              private setSvc : SetService) { }

  ngOnInit() {
      console.log("MS loaded");
      console.log(this.ms);
      //this.loadProfile();
      let id = this.ms.id;
      this.msInfo.loadMeta([id]);
      this.profileCmp.fetchProfile(id);
      this.lineWidth = this.msSize.width;
      
      
      
  }

 
    
    
highlightToken(search:Search){
    console.log(search);
    let hits = 0;
    this.ms.lines.forEach((l)=>{l.tokens.forEach((t)=>{
                               if(search.perform(t)){
                               t.color = search.color;
                               hits++;
                              }
                              })});

this.searchResults.push([search.color, hits]);
    
}  
    
    
clear(){
    console.log("search");
    this.searchResults = [];
    this.ms.lines.forEach((l)=>{l.tokens.forEach((t)=>{
                               
                               t.color = "transparent";
                              
                              })});
    
}  
    
highlightLine(scoreTreshold: number){
    let msId = this.ms.id;
    let offset : number = 0;
    this.ms.lines.forEach((l, li)=>{if(l.matchScore>=scoreTreshold){
                                    let alpha = l.matchScore / l.tokens.length;
                                   l.color ="rgba(255,255,255,"+alpha+")";
                                   offset = document.getElementById(msId+"/"+li).offsetTop;
                                   }}); 
    console.log("scrolling to " + offset);
    this.wrapper.nativeElement.scrollTop = offset - 100;
    
}
    

alignMss(line:MsLine){
    this.requestAlign.emit(line);   
}
    
fireSearch(event){
    console.log(event);
    this.requestSearch.emit(event[0]);
    this.requestAlternatives.emit(event[1]);   
}
    
compareProfiles(){
    console.log("comparing profiels");
    this.showProfile = this.profileCmp.toggle();
    console.log("toggled");
    console.log(this.showProfile);
    this.requestComparison.emit("-");       
}
    

    
    
    
}
