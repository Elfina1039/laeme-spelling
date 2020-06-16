import { Injectable } from '@angular/core';
import { MsSearch, MapSearch, SetSearch } from '../classes/general';
import { Item, ItemList } from '../classes/profile';


@Injectable({
  providedIn: 'root'
})
export class MemoryService {
 msSearches : MsSearch[] = [];
 mapSearches : MapSearch[] = [];
itemLists : ItemList[] = [];
  constructor() {
      let ref = this;
      
      if(localStorage.getItem("msSearches")){
          this.msSearches = JSON.parse(localStorage.getItem("msSearches"));
      }
      
       if(localStorage.getItem("mapSearches")){
          this.mapSearches = JSON.parse(localStorage.getItem("mapSearches"));
      }
      
       if(localStorage.getItem("itemLists")){
          let itemLists = JSON.parse(localStorage.getItem("itemLists"));
           itemLists.forEach((il)=>{
               let newList = new ItemList(il.label, il.itemList);
               ref.itemLists.push(newList);
           });
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
    
addItemList(il){
    let label = prompt("Add a label to the list");
    let newList = new ItemList(label, il);
    this.itemLists.push(newList);
    let current = this.itemLists;
    localStorage.setItem("itemLists",JSON.stringify(current));
}
    
pushItemList(il){
    
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
