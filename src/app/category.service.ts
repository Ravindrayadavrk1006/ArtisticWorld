import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories;
  constructor(private db:AngularFireDatabase) { }
  getCategories()
  {
   
    return this.db.list('/categories', ref => (ref.orderByChild('name')))
    .snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }

  
}
