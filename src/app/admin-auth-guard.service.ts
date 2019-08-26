import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService  {
  id:String
  constructor(private auth:AuthService,private userService:UserService,private db:AngularFireDatabase) { }
  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(switchMap(user => this.userService.get(user.uid)))
    .pipe(map((appUser: any) => appUser.isAdmin));  
   }
}