import { Component, OnInit, Renderer2, ViewChild, Input} from '@angular/core';
import {  Router } from '@angular/router';
import {  SearchFnc } from '../classes/general';
import { MemoryService } from '../services/memory.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    
    @ViewChild("wrapper") wrapper : any;
    
    publicLinks : SearchFnc[] = [
        {label : "Title page", fnc : ""},
        {label : "About the tool", fnc : "/overview"},
        {label : "References", fnc : "/references"}
       // {label : "Poema Morale", fnc : "/title-page-pm"}
      
    ];
    
    privateLinks : SearchFnc[] = [
          {label : "Browse MSs", fnc : "/mss-list"},
           {label : "Browse Texts", fnc : "/texts-list"},
        {label : "Search DB", fnc : "/search"},
        {label : "Maps", fnc : "/map"},
        {label : "Searches", fnc : "/searches"}
       // {label : "Poema Morale", fnc : "/title-page-pm"}
      
    ];
    
    quickLinks : SearchFnc[] = [
        {label : "Profile", fnc : "/profile"},
        {label : "Comparison", fnc : "/comparison"},
        {label : "Map", fnc : "/map/mapSet"},
         {label : "MSs", fnc : "/mss"},
        {label : "Network", fnc : "/network/getMsCorresp"},
        {label : "Double network", fnc : "/network/getCorresp"}
    ];
    
   
    
    width : number = 0;
     

  constructor(private router : Router,
              private renderer : Renderer2,
              private memorySvc : MemoryService,
              private loginSvc : LoginService) {}

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
