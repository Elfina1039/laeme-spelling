import { Directive, Input, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appRedirect]'
})
export class RedirectDirective implements OnInit {
    @Input("appRedirect") icon : string;
  constructor(private el: ElementRef) { }
    
    
    @HostListener("mouseenter") OnHover(){
      
        this.el.nativeElement.style.boxShadow="1px 1px 3px white";
    }
    
     @HostListener("mouseleave") OnBlur(){
  
        this.el.nativeElement.style.boxShadow="none";
    }
    
ngOnInit(){
    this.el.nativeElement.style.display="inline-block";
     this.el.nativeElement.style.height="1.8em";
    this.el.nativeElement.style.width="1.8em";
    this.el.nativeElement.style.padding="0.1em";
    this.el.nativeElement.style.backgroundColor="navy";
    this.el.nativeElement.style.border="1px solid white";
    
    this.el.nativeElement.style.borderRadius="0.3em";
   this.el.nativeElement.style.backgroundSize="1.6em 1.6em"; 
    this.el.nativeElement.style.backgroundRepeat="no-repeat";
   this.el.nativeElement.style.backgroundPosition="0.1em 0.1em"; this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/"+this.icon+")";
}

}
