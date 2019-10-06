import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable,OnDestroy } from '@angular/core';
import {Subscription, Observable} from 'rxjs'
import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy {
subs:Subscription
  constructor(private db:AngularFireDatabase) { }
//   private create()
//   {
//    return  this.db.list('/shopping-carts').push({
//       dateCreated:new Date().getTime(),
//     })
//   }
//   private getCart(cartId:string)
//   {
//     return this.db.object('/shopping-carts/'+cartId).valueChanges();
//   }
//   private getItem(cartId, productId) {
//     console.log('cartId=>'+cartId+'productId=>'+productId)
//     // this.db.object('/shopping-carts/'+cartId+'/items/');
//     // return  this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
//     return this.
//   }
//   private async getOrCreateCartId()
//   {
//     let cartId=localStorage.getItem('cartId');
//     if(cartId) return cartId;
//     let result=await this.create();
//     localStorage.setItem('cartId',result.key);
//     return result.key;
//         //repalaceent for this
//       // this.create().then(result=>{
//       //   localStorage.setItem('cartId',result.key);
//       //   return this.getCart(result.key);
//       // });
//   } 
//   public async addToCart(p)
//   {

//     let cartId = await this.getOrCreateCartId();
//     // let item$ = this.db.object('/shopping-carts/'+ cartId+ '/items/' +product.key);
//       // console.log('item observable'+item$);
//     //since can't update the valueChanges hence stored the items$ in just the value and then subscribed to valueChanges()
//     let item$=this.getItem(cartId,p.key);
//     // this.subs=item$.valueChanges().subscribe(item=>{
//     //   item$.update({product:p,quantity:(item['quantity']||0)+1});
//     //   console.log('item present'); 
//     // }) ;
// }





// //ONLINE CODE

async removeItem(item: Product) {
  let cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items/' + item.key).remove();
}

async clearCart() {
  let cartId = await this.getOrCreateCartId();
  this.db.object('/shopping-carts/' + cartId + '/items').remove();
}

async addToCart(product: Product) {
  
  this.updateItem(product, 1);
}

async removeFromCart(product: Product) {
  this.updateItem(product, -1);
}

async getCart(){
  let cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-carts/' + cartId).valueChanges()
  // .pipe(map(x=>{  
  //   new ShoppingCart(x['items'])
  // })); 
    // .map(x => new ShoppingCart(x['items']));
}

private create(){
  return this.db.list('/shopping-carts').push({
    dateCreated: new Date().getTime()
  })
}

private getItem(cartId: string, productId: string){
  return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
}

private async getOrCreateCartId(): Promise<string>{
  let cartId = localStorage.getItem('cartId');
  if(cartId) return cartId;
  
  let result = await this.create();
  localStorage.setItem('cartId', result.key);
  return result.key;
}

private async updateItem(product: Product, change: number) {
  let cartId = await this.getOrCreateCartId();
  let item$ = this.getItem(cartId, product.key);
  item$.valueChanges().pipe(take(1)).subscribe(item => {
    let productQuantity = (product['quantity'] || 0) + change;
    let itemQuantity;
    if (item) {
      itemQuantity = item['quantity'];
      if(item['quantity'] === 0 || productQuantity === 0) {
        return item$.remove();
      }
      item$.update({
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: itemQuantity + change });
    } else {
      itemQuantity = productQuantity;
      if(productQuantity === 0 || itemQuantity === 0) {
        return item$.remove();
      }
      item$.update({
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: productQuantity });
    }
  })
}
  ngOnDestroy()
  {
    // this.subs.unsubscribe();
  }
} 