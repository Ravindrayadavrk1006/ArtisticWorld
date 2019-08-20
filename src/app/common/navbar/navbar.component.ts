import { AuthService } from './../../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase'
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  loggedUser:firebase.User;
  user$:Observable<firebase.User>
  private subscription:Subscription;
  constructor(public auth:AuthService) {
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
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
