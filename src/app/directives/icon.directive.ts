import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIcon]'
})
export class IconDirective {

    icon : string = "";
  constructor(protected el : ElementRef) { }
    
        @HostListener("mouseenter") OnHover(){
     let ref =this;
     this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/"+ref.icon+"_b.png)";
            this.el.nativeElement.style.cursor = "hand";
    };
    
      @HostListener("mouseleave") OnBlur(){
     let ref =this;
          this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/"+ref.icon+"_w.png)";
    };

}
