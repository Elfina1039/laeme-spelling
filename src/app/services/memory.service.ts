import { Injectable } from '@angular/core';
import { MsSearch, MapSearch, SetSearch } from '../classes/general';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
 msSearches : MsSearch[] = [];
 mapSearches : MapSearch[] = [];
  constructor() {
      if(localStorage.getItem("msSearches")){
          this.msSearches = JSON.parse(localStorage.getItem("msSearches"));
      }
      
       if(localStorage.getItem("mapSearches")){
          this.mapSearches = JSON.parse(localStorage.getItem("mapSearches"));
      }
  
  
  }
    
    
addMsSearch(s){
    this.msSearches.push(s);
    let current = this.msSearches;
    localStorage.setItem("msSearches",JSON.stringify(current));
}
    
addMapSearch(s){
    this.mapSearches.push(s);
    let current = this.mapSearches;
    localStorage.setItem("mapSearches",JSON.stringify(current));
}
    
clearMsSearches(){
    this.msSearches=[];
    localStorage.removeItem("msSearches");
}
    
clearMapSearches(){
    this.mapSearches=[];
    localStorage.removeItem("mapSearches");
}
   
    
    
    
}
