import { Directive, ElementRef, HostListener, Input, ViewContainerRef, TemplateRef  } from '@angular/core';
import { MsMeta } from '../classes/manuscript';

@Directive({
  selector: '[appOrder]'
})
export class OrderDirective {
 
    
    @Input("appOrder") set data(data : MsMeta[]) {
    let sorted = data.sort((a,b)=>{ return a.texts < b.texts ? -1 : 1 });
        console.log(sorted);
     this.viewContainer.createEmbeddedView(this.templateRef);
 }
    
  constructor(private el : ElementRef, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
    

   
}
