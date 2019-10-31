import { map } from 'rxjs/operators';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // user$:AppUser
  
  constructor(private db:AngularFireDatabase) { }
  save(user:firebase.User)
  {
    this.db.object('/users/'+user.uid).update({
      name:user.displayName,
      email:user.email
    })
  }
 
    get(uid: string): Observable<any> {
      return this.db.object('/users/' + uid).valueChanges();
   }
  //    this.db.object('/users/'+uid).valueChanges().subscribe(
  //    user=>{
  //     console.log("user=>") 
  //     console.log(user)
  //     // this.user$=user;
  //   console.log(user['isAdmin'])
  //   if(user['isAdmin'])
  //         return user['isAdmin'];
  // });
}
