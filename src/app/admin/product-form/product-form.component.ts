import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
}) 
export class ProductFormComponent implements OnInit,OnDestroy{
  categories$;
  // product={};
  product={title:'',price:0,category:'',imageUrl:''};
  id;
  private subs:Subscription;
  constructor(private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private route:ActivatedRoute
    ) 
  { 
    this.categories$=this.categoryService.getAll();
    console.log(this.categories$);
    this.id=this.route.snapshot.paramMap.get('id');
    if (this.id)
       this.subs=this.productService.get(this.id).subscribe(p=>{
         console.log(p);
        this.product.title=p['title'];
        this.product.price=p['price'];
        this.product.category=p['category'];
        this.product.imageUrl=p['imageUrl'];
        // this.product=p;
      });
  }
  save(product)
  {
    if(this.id)
    {
      this.productService.update(this.id,product);
    }
    else
    this.productService.create(product);
    
    console.log(product);
    this.router.navigate(['/admin/products']);
  }
  delete()
  {
    if(confirm("Are you sure you want to delete this product")){
      this.productService.delete(this.id)
      this.router.navigate(['/admin/products']);  
    } 
  }
  ngOnDestroy()
  {
      this.subs.unsubscribe();
  }
  ngOnInit() {
  }
}
  