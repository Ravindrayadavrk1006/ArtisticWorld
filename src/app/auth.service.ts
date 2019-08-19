import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   usersubs;
  constructor(private afAuth: AngularFireAuth) {
    this.usersubs=this.afAuth.authState
   }
  login()
  {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout()
  {
    this.afAuth.auth.signOut();
  }

}
