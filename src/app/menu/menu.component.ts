import { Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';
import {  SearchFnc } from '../classes/general';

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
    
    
   
    
    height : number = 0;
     

  constructor(private router : Router,
              private renderer : Renderer2) { }

  ngOnInit() {
  }

toggle(){
    let toRender = this.wrapper.nativeElement;
    let h = -this.height + 20;
    this.height = h;
    this.renderer.setStyle(toRender, "height",h+"em");
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
