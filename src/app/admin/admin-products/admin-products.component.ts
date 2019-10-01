import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export  class AdminProductsComponent implements OnInit,OnDestroy {

  products:any[];
  // items: any[]=[];  
  // itemCount:number;
  filteredProducts:any[];  
  subs:Subscription;
  constructor(private productService:ProductService) { 
    this.subs=this.productService.getAll().subscribe(products=>{
      this.filteredProducts=this.products=products;
      // this.initializeTable(products);
    })
  }
  // private initializeTable(products:any[])
  // {
  //   this.tableResource=new DataTableResource(products);
  //   this.tableResource.query({offset:0})
  //   .then(items=>{
  //     this.items=items;})
  //     this.tableResource.count()
  //     .then(count=>{
  //       this.itemCount=count;
  //     })
  // }
  // reloadItems(params)
  // {
  //   if(!this.tableResource) return; 
  //   this.tableResource.query({offset:params})
  //   .then(items=>{
  //     this.items=items;})
  // }
  filter(query:String)
  {
    this.filteredProducts=(query)?this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
    this.products;
  }
  ngOnDestroy()
  {
    this.subs.unsubscribe( );

  }
  ngOnInit() {
  }

}
