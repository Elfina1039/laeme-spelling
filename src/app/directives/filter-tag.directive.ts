import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Filter } from "../classes/general"


@Directive({
  selector: '[appFilterTag]'
})
export class FilterTagDirective implements OnInit {
 @Input("appFilterTag") filter : Filter;
    colorKey : any = {m : "navy", l : "#b30e11"}
    
    
  constructor(private el : ElementRef) {
el.nativeElement.style.borderRadius="0.2em";
el.nativeElement.style.padding="0.2em";
      el.nativeElement.style.color="white";
el.nativeElement.style.border="1px dashed white";
   
  }
    
    ngOnInit(){
        console.log("colouring tag: " +this.colorKey[this.filter.level]);
        this.el.nativeElement.style.backgroundColor=this.colorKey[this.filter.level];
    }
    
    

}
