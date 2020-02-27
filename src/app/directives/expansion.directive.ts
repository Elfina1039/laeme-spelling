import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appExpansion]'
})
export class ExpansionDirective {
    
    @Input("appExpansion") minHeight : string;

  constructor(private el : ElementRef) { }
    
    @HostListener("click") onClick (){
        
        if(this.el.nativeElement.nextSibling.style.height=="0em" || this.el.nativeElement.nextSibling.style.height==""){
            console.log("opening");

            this.el.nativeElement.nextSibling.style.height="7em"; 
            this.el.nativeElement.nextSibling.style.overflow="scroll"; 
        }else{
            console.log("closing");
             this.el.nativeElement.nextSibling.style.overflow="hidden"; 
           this.el.nativeElement.nextSibling.style.height="0em";  
        }
       
    }
    

}
