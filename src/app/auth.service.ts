import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersubs;
  user$:Observable<firebase.User>
  constructor(private afAuth: AngularFireAuth) {
    this.usersubs=this.afAuth.authState
    this.user$=this.afAuth.authState;
   }
   authenticated()
  {
    return this.afAuth.authState!==null;
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
