import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as Material from "@angular/material";

import { AdminLayoutRoutes } from './admin-layout.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NhomhangService } from 'app/shared/services/nhomhang.service';
import { ThuonghieuService } from 'app/shared/services/thuonghieu.service';
import { SanphamService } from 'app/shared/services/sanpham.service';
import { KhuyenmaiComponent } from 'app/pages/sanpham/khuyenmai/khuyenmai.component';
import { KhuyenmaiDetailComponent } from 'app/pages/sanpham/khuyenmai/khuyenmai-detail/khuyenmai-detail.component';
import { KhuyenmaiListComponent } from 'app/pages/sanpham/khuyenmai/khuyenmai-list/khuyenmai-list.component';
import { SanphamComponent } from 'app/pages/sanpham/sanpham/sanpham.component';
import { SanphamListComponent } from 'app/pages/sanpham/sanpham/sanpham-list/sanpham-list.component';
import { SanphamDetailComponent } from 'app/pages/sanpham/sanpham/sanpham-detail/sanpham-detail.component';
import { NhomhangComponent } from 'app/pages/sanpham/nhomhang/nhomhang.component';
import { NhomhangListComponent } from 'app/pages/sanpham/nhomhang/nhomhang-list/nhomhang-list.component';
import { NhomhangDetailComponent } from 'app/pages/sanpham/nhomhang/nhomhang-detail/nhomhang-detail.component';
import { ThuonghieuComponent } from 'app/pages/sanpham/thuonghieu/thuonghieu.component';
import { ThuonghieuDetailComponent } from 'app/pages/sanpham/thuonghieu/thuonghieu-detail/thuonghieu-detail.component';
import { ThuonghieuListComponent } from 'app/pages/sanpham/thuonghieu/thuonghieu-list/thuonghieu-list.component';
import { KhuyenmaiService } from 'app/shared/services/khuyenmai.service';
import { DonhangComponent } from 'app/pages/donhang/donhang.component';
import { DonhangListComponent } from 'app/pages/donhang/donhang-list/donhang-list.component';
import { DonhangService } from 'app/shared/services/donhang.service';
import { DonhangDetailComponent } from 'app/pages/donhang/donhang-detail/donhang-detail.component';
import { DonhangDetailItemComponent } from 'app/pages/donhang/donhang-detail/donhang-detail-item/donhang-detail-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { KhachhangComponent } from 'app/pages/khachhang/khachhang.component';
import { KhachhangListComponent } from 'app/pages/khachhang/khachhang-list/khachhang-list.component';
import { KhachhangDetailComponent } from 'app/pages/khachhang/khachhang-detail/khachhang-detail.component';
import { KhachhangService } from 'app/shared/services/khachhang.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    HttpClientModule
  ],
  declarations: [
    KhuyenmaiComponent,
    KhuyenmaiDetailComponent,
    KhuyenmaiListComponent,
    SanphamComponent,
    SanphamListComponent,
    SanphamDetailComponent,
    NhomhangComponent,
    NhomhangListComponent,
    NhomhangDetailComponent,
    ThuonghieuComponent,
    ThuonghieuDetailComponent,
    ThuonghieuListComponent,
    DonhangComponent,
    DonhangListComponent,
    DonhangDetailComponent,
    DonhangDetailItemComponent,
    KhachhangComponent,
    KhachhangListComponent,
    KhachhangDetailComponent,
  ],
  providers: [
    NhomhangService,
    ThuonghieuService,
    SanphamService,
    KhuyenmaiService,
    DonhangService,
    KhachhangService
  ],
  entryComponents: [DonhangDetailItemComponent]
})

export class AdminLayoutModule { }
