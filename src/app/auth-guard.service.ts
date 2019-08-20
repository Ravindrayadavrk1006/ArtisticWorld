import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private loggedIn:boolean=false;
  constructor(private auth:AuthService,private router:Router) {
    
   }
  canActivate() { 
  
   return  this.auth.user$.pipe(map((user=>{
      if(user)
      return true;
      this.router.navigate(['/login'])
      return false;
    })))
  }
}
