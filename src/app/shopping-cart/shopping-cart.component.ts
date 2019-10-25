import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number=0;
  cart$;
  productCart$;
  productIds=[];
  constructor(private shoppingCartService:ShoppingCartService)
   {
    


  }

  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart()
    this.cart$.subscribe(cart=>{
      this.productIds=[];
      this.shoppingCartItemCount=0;
      for(let productId in cart['items'] )
      {
        // console.log(productId);
        this.productIds.push(productId);
        // console.log(cart['items'][productId]['title'])  
        this.shoppingCartItemCount+=cart['items'][productId]['quantity'];
      }
    })
    // if(this.shoppingCartItemCount==0)
    // {
    //   this.shoppingCartService.clearCart();
    // }
    // this.shoppingCartService.getAll()
    //   .then(products=>{
    //     this.productCart$=products
    //   })
    this.productCart$=await this.shoppingCartService.getAll();
    // this.productCart$.subscribe(cart=>{
    // })


  }
  // async readingCart()
  // {
  //   this.cart$= await this.shoppingCartService.getCart()
  //   this.cart$.subscribe(cart=>{
  //     this.shoppingCartItemCount=0;
  //     for(let productId in cart['items'] )
  //     {
  //       console.log(productId);
  //       this.productIds.push(productId);
  
  //       this.shoppingCartItemCount+=cart['items'][productId]['quantity'];
  //     }
  //   })


  // }
  removeFromCart(product)
  {
   
    this.shoppingCartService.removeItem(product);
    // this.readingCart();
  }
}
