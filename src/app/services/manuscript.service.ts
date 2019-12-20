import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManuscriptService {

 
  constructor(private http: HttpClient) { 
      console.log("data service construction");

  }
    
    
    
      fetchMs(msId){
        console.log("fetch "+msId);
        return this.http.get("/assets/text_"+msId+".json");
        
    }
    
    fetchProfile(msId){
        console.log("fetch "+msId);
        return this.http.get("/assets/profiles/profile_"+msId+".json");
        
    }
}
