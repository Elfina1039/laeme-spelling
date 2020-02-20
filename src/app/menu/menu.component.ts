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
        {label : "Browse sets", fnc : "/sets"},
        {label : "Maps", fnc : "/map"},
        {label : "Text profiles", fnc : "/profiles"}
    ];
    
    quickLinks : SearchFnc[] = [
        {label : "See profile", fnc : "/profile"},
        {label : "Get Map", fnc : "/map/mapSet"},
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
