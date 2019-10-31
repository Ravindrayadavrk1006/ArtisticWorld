import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
  import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products:any[]=[];
  filteredProducts:any[]=[];
  subs:Subscription;
  category;
  cart: unknown;
  constructor(
    route:ActivatedRoute,
    private productService:ProductService,
    private cartService:ShoppingCartService) 
    {
    this.productService.getAll().subscribe(products=>{
      this.products=products;
      route.queryParamMap.subscribe(params=>{
        this.category=params.get('category');

        this.filteredProducts=(this.category)?
          this.products.filter(p=>p['category']===this.category):
          this.products;
      })

    });
   }

  async ngOnInit() {
    (await this.cartService.getCart())
        .subscribe(cart=>this.cart=cart)
  }
  ngOnDestroy()
  {
    // this.subs.unsubscribe();
  }
}
