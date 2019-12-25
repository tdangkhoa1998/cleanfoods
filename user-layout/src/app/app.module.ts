import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { ProductDetailComponent } from './home-product/product-detail/product-detail.component';
import { CardComponent } from './homepage/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { SanphamService } from './shared/services/sanpham.service';
import { OrderProductComponent } from './homepage/order-product/order-product.component';
import { DonhangService } from './shared/services/donhang.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartInfoComponent } from './homepage/card/cart-info/cart-info.component';
import { PayMethodComponent } from './homepage/card/pay-method/pay-method.component';
import { ChangesoluongComponent } from './homepage/card/changesoluong/changesoluong.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    HomeProductComponent,
    ProductDetailComponent,
    CardComponent,
    OrderProductComponent,
    AboutUsComponent,
    CartInfoComponent,
    PayMethodComponent,
    ChangesoluongComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(AppRoutingModule, {
      useHash: true
    }),

  ],
  entryComponents: [OrderProductComponent, PayMethodComponent, ChangesoluongComponent],
  providers: [
    SanphamService,
    DonhangService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
