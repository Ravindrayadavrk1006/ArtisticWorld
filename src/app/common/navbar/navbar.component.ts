import { AuthService } from './../../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase'
import { Subscription } from 'rxjs';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  loggedUser:firebase.User;
  private subscription:Subscription;
  constructor(private auth:AuthService) {
     this.subscription=this.auth.usersubs.subscribe(user=>{
      console.log(user);
      this.loggedUser=user;
    })
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
