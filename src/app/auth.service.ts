import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // usersubs;
  user$:Observable<firebase.User>
  constructor(private afAuth:AngularFireAuth ,private route:ActivatedRoute,private userService:UserService) {
    // this.usersubs=this.afAuth.authState
    this.user$=this.afAuth.authState;
   }
  login()
  {
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')||'/';
    console.log(returnUrl);
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout()
  {
    this.afAuth.auth.signOut();
  }
  get appUser$():Observable<AppUser>
  {
    return this.user$.pipe(switchMap(user => this.userService.get(user.uid)))
  }
}
