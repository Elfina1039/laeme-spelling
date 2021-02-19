import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor() { }
    
    
moveComponent(c, parent){
   let nPos =  this.updatePosition(parent);
    console.log("moving cmp: " + nPos.join(","));
    console.log(c.getBoundingClientRect());
   c.style.display = "block";
    c.style.position = "inherit";
        
    c.style.top = "inherit";
    c.style.bottom ="inherit";
    console.log(c.offsetHeight);
    
    c.style.position = "absolute";
    

    
    c.style[nPos[3]]=nPos[1]+"px";
    c.style.left=nPos[0]+"px";
    c.style.maxHeight = nPos[2]+"px";
    
   // this.adjustHeightToScreen(c,c.style[nPos[2]]);
}
    
updatePosition(c){
    
    let rect = c.getBoundingClientRect();
    let windowHeight = window.innerHeight;
    let x,y : number;
    let maxHeight: number;
    let posY : string;
    console.log(rect);
    

    if(rect.top<=(windowHeight/2)){
        posY = "top";
          x = rect.right;
       y = rect.bottom;
       maxHeight = windowHeight-rect.bottom-rect.height;  
    }else{
        posY = "bottom";
        maxHeight = rect.top-rect.height ;  
        x = rect.right;
       y = windowHeight-rect.top; 
       
    }

    return [x,y, maxHeight, posY];
}
    
adjustHeightToScreen(c, refPoint){
    let rsl : number;
    let rect = c.getBoundingClientRect();
    let windowHeight = window.innerHeight;
     if(refPoint<=(windowHeight/2)){
       rsl = windowHeight-rect.top;  
     }else{
         rsl = rect.bottom ;  
     }
    
    console.log(rsl);
    c.style.maxHeight = rsl+"px";
}
 
    
    
    
    
    
}


