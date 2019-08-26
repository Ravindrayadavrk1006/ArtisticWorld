import { AppUser } from './../../models/app-user';
import { UserService } from './../../user.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase'
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser:firebase.User;
  // user$:Observable<firebase.User>
  private subscription:Subscription;
  appUser:AppUser
  constructor(private auth:AuthService,private userService:UserService) {
    var subs$=this.auth.user$.pipe(switchMap(user => this.userService.get(user.uid))).subscribe(AppUser=>{
      this.appUser=AppUser;
    })
    // this.user$=this.auth.user$
    //  this.subscription=this.auth.usersubs.subscribe(user=>{
    //   console.log(user);
    //   this.loggedUser=user;
    // })
   }
  ngOnInit() {
  }
  logout()
  {
    this.auth.logout();
  }
  // ngOnDestroy()
  // {
  //   this.subscription.unsubscribe();
  // }
}
