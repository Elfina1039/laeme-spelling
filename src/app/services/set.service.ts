import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetService {

   
  constructor(private http: HttpClient) { 
      console.log("data service construction");

  }
    
    
    
      fetchSets(){
        console.log("fetch Sets");
        return this.http.get("/assets/sets_sample.json");
        
    }
    
    
       fetchItems(){
        console.log("fetching items");
        return this.http.get("/assets/items_sample.json");
        
    }
    

}
