import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from '@angular/core';
import { IconDirective } from './icon.directive';

@Directive({
  selector: '[appExpansion]'
})
export class ExpansionDirective extends IconDirective implements OnInit {
    
    @Input("appExpansion") content ;
    @Input("expanded") expanded : boolean = true;
    @Input("expandMax") max : string = "30em";

  constructor(protected el : ElementRef,
               protected renderer: Renderer2) {
      super(el);
    this.icon="collapse";
  }
    
    @HostListener("click") onClick (){
        
          console.log(this.expanded);
  console.log(this.content);
        
        if(this.expanded==true){
            this.collapse();
        }else{
            this.expand();
        }
    
       
    }
    
    
    ngOnInit(){
 
        
     this.el.nativeElement.innerHTML=this.el.nativeElement.id;    
        
     this.el.nativeElement.style.color="white";
          this.el.nativeElement.style.fontSize="12pt";
    this.el.nativeElement.style.display="inline-block";
        
        this.el.nativeElement.style.margin="0.5em";
     
    this.el.nativeElement.style.width="1.6em";  
        this.el.nativeElement.style.height="1.6em"; 
        
    this.el.nativeElement.style.backgroundColor="transparent"
   this.el.nativeElement.style.border="none";
    
    this.el.nativeElement.style.border="2px outset white";
    this.el.nativeElement.style.borderRadius="0.3em";
   this.el.nativeElement.style.backgroundPosition="10% 10%"; 
    this.el.nativeElement.style.backgroundRepeat="no-repeat";
   this.el.nativeElement.style.backgroundSize="120% 120%"; this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/collapse_w.png)";
}
    
collapse(){
    console.log("collapsing");
    let toRender=this.content;
    this.renderer.setStyle(toRender, "maxHeight", "0px");
    this.expanded=false;
    this.icon="expand"
    this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/expand_w.png)";

    
    this.toggleChildren("none");
}
    
  expand(){
      let ref=this;
    let toRender=this.content;
    this.renderer.setStyle(toRender, "maxHeight", ref.max);
    this.expanded=true;
      this.icon="collapse"
      this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/collapse_w.png)";
        this.toggleChildren("block");
}
    
    toggleChildren(val:string){
    
        let children = this.content.children;
        for (let ch=1; ch<children.length;ch++){
            console.log(children[ch]);
            children[ch].style.display=val;
        }
    }
    

}
