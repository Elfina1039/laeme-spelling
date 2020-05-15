import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
   constructor(private router: Router, private loginSvc : LoginService) {} ;
    
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      if(this.loginSvc.verifyToken()){
          console.log("auth ok");
          return true;
      }else{
          console.log("auth not ok");
          this.router.navigateByUrl('/login');
            return false;
      }
      
  
  }
}
