import { Component, OnInit, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    user : any = {login:"", password:""};
    message : string = "";
    
    
    @Input("margin") margin : string = "200px";
    @Input("alrt") alrt : string = "T";
     @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
    
  constructor(private loginSvc : LoginService) { }

  ngOnInit() {
        this.cmpLoaded.emit();
  }
    

    logIn(){
        let login = this.user.login;
        let password = this.user.password;
        let ref = this;
        
        console.log("login = "+login);
           this.loginSvc.logIn(login, password).subscribe((data:any)=>{
          if(data.result=="200"){
              ref.storeJwt(data);
          }else{
              ref.invalidLogin(data);
          }
       
      })
        
    }
    
    storeJwt(data){
        window.localStorage.setItem("jwt",data.jwt);
         window.localStorage.setItem("login",data.login);
        this.message = "Login successful. Welcome, "+data.login;
    }
    
     invalidLogin(data){
         window.localStorage.removeItem("jwt");
       this.message = "Invalid login data";
    }

}

