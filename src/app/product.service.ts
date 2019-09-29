import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }
  create(product)
  {
    this.db.list('/products').push(product);
  }
  getAll()
  {
    return this.db.list('/products').snapshotChanges().pipe(map(actions=>{
      return actions.map(action=>({key: action.key, ...action.payload.val() }));
    }));
  }
  get(productId)
  {
    return this.db.object('/products/'+productId).valueChanges();
  }
  update(productId,product)
  {
    return  this.db.object('/products/'+productId).update(product);
  }
  delete(productId)
  {
    this.db.object('/products/'+productId).remove();

  }
} 
   