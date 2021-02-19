import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router : Router) { }
    
    
        logIn(login, password){
        console.log("fetch" + login);

  //  return this.http.get("/assets/login.php?login="+login+"&password="+password);
             return this.http.get("http://localhost/laeme-scripts/php/login.php?login="+login+"&password="+password);
    }
    
    logOut(){
       window.localStorage.clear();
         this.router.navigateByUrl('/login');
    }
    
    
       verifyToken(){
        
           let login = window.localStorage.getItem("login");
           let jwt = window.localStorage.getItem("jwt");
           
         //  console.log("verify" + jwt);
       // return this.http.get("/assets/queryDb.php?fnc="+fnc+"&args="+args.join(";"));
   // return this.http.get("http://localhost/laeme-scripts/php/verifyToken.php?login="+login+"&jwt="+jwt);
           
           if(login && jwt){
               return true;
           }else{
               return false;
           }
           
          
}

    
}
