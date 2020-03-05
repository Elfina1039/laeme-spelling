import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetService {

    fncKey : any = {getSetsByLits : "getSlotsByLits", 
                   getSetsByText : "getSlotsByText",
                   getSetsByTextAndLits : "getSlotsByTextAndLits"};
   
  constructor(private http: HttpClient) { 
      console.log("data service construction");

  }
    
        fetchUniversal(fnc, args){
        console.log("fetch" + fnc);
       // return this.http.get("/assets/queryDb.php?fnc="+fnc+"&args="+args.join(";"));
    return this.http.get("http://178.209.131.86/laeme-scripts/php/queryDb.php?fnc="+fnc+"&args="+args.join(";"));
    }
    
   orderBy(arr, crit){
    console.log("sorting by " + crit);
   let sorted = arr.sort((a,b)=>{return a[crit]>b[crit] ? -1:1});
   return sorted;
}    
    
    
    
    // deprecated
    
      fetchSets(){
        console.log("fetch Sets");
        return this.http.get("/assets/queryDb.php?fnc=getSetsByText&args=8");
        
    }
    

    
       fetchTextSets(id){
        console.log("fetch Sets for text " + id);
        return this.http.get("/assets/text_sets_sample.json");
        
    }
    
    
       fetchItems(){
        console.log("fetching items");
        return this.http.get("/assets/items_sample.json");
        
    }
    

}
