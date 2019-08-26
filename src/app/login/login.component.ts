import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import {AngularFireAuth} from 'angularfire2/auth'
import { Router } from '@angular/router';
import { UserService } from '../user.service';
// import {AngularFireAuth} from angularfire2/auth
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private userService:UserService) { 
    // this.afAuth.authState.subscribe(userResponse => {
    //   if (userResponse) {
    //     localStorage.setItem('user', JSON.stringify(userResponse));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // })
  }

  ngOnInit() {
  }
  login()
  {
    
    this.auth.login();
  }

}
