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
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
   return  this.auth.user$.pipe(map((user=>{
      if(user)
      return true;
      else
      {
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
      return false;
      }   
    })))
  }
}
