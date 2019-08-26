import { AdminAuthGuardService as AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
// import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';
import {RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent
  ],
  imports: [
    AngularFireAuthModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'login',component:LoginComponent},
      {path:'my/orders',component:MyOrdersComponent},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'check-out',component:CheckOutComponent,canActivate:[AuthGuard]},
      {path:'order-success',component:OrderSuccessComponent},
      // for admin
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AdminAuthGuard]},
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AdminAuthGuard]}
    ])
  ],
  providers: [AngularFireAuth,
              AuthService,
              AuthGuard,
              UserService,
              AdminAuthGuard
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
