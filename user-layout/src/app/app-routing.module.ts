import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { ProductDetailComponent } from './home-product/product-detail/product-detail.component';
import { CardComponent } from './homepage/card/card.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartInfoComponent } from './homepage/card/cart-info/cart-info.component';


export const AppRoutingModule: Routes = [

  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'home-product',
    children: [
      { path: '', component: HomeProductComponent },
      { path: 'detail/:id', component: ProductDetailComponent }
    ]
  },
  {
    path: 'cart',
    component: CardComponent
  },
  {
    path: 'cart-info',
    component: CartInfoComponent
  }

] 
