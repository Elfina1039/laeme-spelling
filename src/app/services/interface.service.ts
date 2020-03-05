import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor() { }
    
    
moveComponent(c, parent){
    this.updatePosition(parent);
 
    c.style.position = "absolute";
    c.style.top=parent.position[1]+"px";
    c.style.left=parent.position[0]+"px";
        c.style.display = "block";
}
    
updatePosition(c){
    console.log(c.wrapper);
      let x = c.wrapper.nativeElement.offsetLeft + c.wrapper.nativeElement.offsetWidth;
      let y = c.wrapper.nativeElement.offsetTop;
      console.log(x + ": " + y);
      c.position = [x,y];
}
 
    
    
    
    
    
}


