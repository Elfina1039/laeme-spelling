import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetService {
    searchMode : string = "slot";

    fncKey : any = {getSetsByLits : "getSlotsByLits", 
                   getSetsByText : "getSlotsByText",
                   getSetsByTextAndLits : "getSlotsByTextAndLits"};
   
  constructor(private http: HttpClient) { 
      console.log("data service construction");

  }
    
        fetchUniversal(fnc, args){
            console.log("fetch: " + args.join("-"));
         //   args.push(this.searchMode);
        console.log("fetch" + args.join("-"));
            let mode = this.searchMode;
      //  return this.http.get("/assets/queryDb.php?fnc="+fnc+"&args="+args.join(";"));
            
   return this.http.get("http://localhost/laeme-scripts/php/queryDb.php?fnc="+fnc+"&args="+args.join(";")+";"+mode);
    }
    
   orderBy(arr, crit){
    console.log("sorting by " + crit);
   let sorted = arr.sort((a,b)=>{return a[crit]<b[crit] ? -1:1});
   return sorted;
}
    
    orderByDesc(arr, crit){
    console.log("sorting by " + crit);
   let sorted = arr.sort((a,b)=>{return a[crit]<b[crit] ? 1:-1});
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
    
        redirectToLaeme(link){  window.open("http://archive.lel.ed.ac.uk/ihd/laeme2_scripts/find_msdescriptor.php?idno="+link);
}
    
            redirectToCone(link){  window.open("http://archive.ling.ed.ac.uk/ihd/cone_scripts/view_CCchangeC2.php?chabbr=(("+link+"))&prntopt=no");
}
    

}
