import { Directive, ElementRef, OnInit, HostListener, Input, ViewContainerRef, TemplateRef  } from '@angular/core';
import { MsMeta } from '../classes/manuscript';
import { IconDirective } from './icon.directive';

@Directive({
  selector: '[appOrder]'
})
export class OrderDirective extends IconDirective implements OnInit {
 
    
    @Input("appOrder") arr : any;
    @Input("orderCrit") crit : string;
     order : boolean = true;
    icon : string ;
    
     @HostListener("click") OnClick(){
      let ref = this;
        this.arr = this.orderBy(ref.arr, ref.crit);
    };
    
    

    
  constructor(protected el : ElementRef, protected viewContainer: ViewContainerRef) {
   super(el);
    this.icon="s_descending";
  
  }
    
    
    ngOnInit(){
     this.el.nativeElement.style.color="white";
    this.el.nativeElement.style.display="inline-block";
     
    this.el.nativeElement.style.width="1.6em";  
        this.el.nativeElement.style.height="1.6em"; 
        
    this.el.nativeElement.style.backgroundColor="transparent"
   this.el.nativeElement.style.border="none";
    
  //  this.el.nativeElement.style.borderRadius="0.3em";
   this.el.nativeElement.style.backgroundPosition="30% 30%"; 
    this.el.nativeElement.style.backgroundRepeat="no-repeat";
   this.el.nativeElement.style.backgroundSize="160% 160%"; this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/s_descending_w.png)";
}
    
    
    
    
   orderBy(arr, crit){
    console.log("sorting by " + crit);
       let sorted;
    if(this.order==true){
        sorted = arr.sort((a,b)=>{return a[crit]<b[crit] ? -1:1});
        this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/s_ascending.png)";
        this.icon = "s_ascending";
    } else{
        sorted = arr.sort((a,b)=>{return a[crit]<b[crit] ? 1:-1});
        this.el.nativeElement.style.backgroundImage="url(/assets/images/icons/s_descending.png)";
        this.icon = "s_descending";
    }  
       
   this.order = !this.order;
       
   return sorted;
}
   
}
