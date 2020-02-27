import { Component, OnInit, Renderer2, ViewChild, Input} from '@angular/core';
import {  Router } from '@angular/router';
import {  SearchFnc } from '../classes/general';
import { MemoryService } from '../services/memory.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    
    @ViewChild("wrapper") wrapper : any;
    links : SearchFnc[] = [
        {label : "Title page", fnc : ""},
          {label : "Browse MSs", fnc : "/mss-list"},
        {label : "Browse sets", fnc : "/sets"},
        {label : "Maps", fnc : "/map"},
        {label : "Searches", fnc : "/searches"},
        {label : "Poema Morale", fnc : "/title-page-pm"}
      
    ];
    
    quickLinks : SearchFnc[] = [
        {label : "Show profile", fnc : "/profile"},
        {label : "Get Map", fnc : "/map/mapSet"},
         {label : "Show Mss", fnc : "/mss"},
        {label : "Show network", fnc : "/network/getMsCorresp"},
        {label : "Show double network", fnc : "/network/getCorresp"}
    ];
    
   
    
    width : number = 0;
     

  constructor(private router : Router,
              private renderer : Renderer2,
              private memorySvc : MemoryService) { }

  ngOnInit() {
  }

toggle(){
    let toRender = this.wrapper.nativeElement;
    let w = -this.width + 7;
    this.width = w;
    this.renderer.setStyle(toRender, "width",w+"em");
}    
    
submitLink(lnk){
    this.router.navigate([lnk]);
    this.toggle();
}
    
submitQuickLink(e){
    this.router.navigate([e.fnc, e.search.main]);
    this.toggle();
}
  
    
    
}
