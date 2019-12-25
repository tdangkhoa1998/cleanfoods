import { Routes } from '@angular/router';
import { KhuyenmaiComponent } from 'app/pages/sanpham/khuyenmai/khuyenmai.component';
import { NhomhangComponent } from 'app/pages/sanpham/nhomhang/nhomhang.component';
import { ThuonghieuComponent } from 'app/pages/sanpham/thuonghieu/thuonghieu.component';
import { SanphamComponent } from 'app/pages/sanpham/sanpham/sanpham.component';
import { DonhangComponent } from 'app/pages/donhang/donhang.component';
import { DonhangDetailComponent } from 'app/pages/donhang/donhang-detail/donhang-detail.component';
import { KhachhangComponent } from 'app/pages/khachhang/khachhang.component';
import { KhachhangDetailComponent } from 'app/pages/khachhang/khachhang-detail/khachhang-detail.component';


export const AdminLayoutRoutes: Routes = [

    {
        path: 'khuyenmai', component: KhuyenmaiComponent
    },
    {
        path: 'nhomhang', component: NhomhangComponent
    },
    {
        path: 'thuonghieu', component: ThuonghieuComponent
    },
    {
        path: 'sanpham', component: SanphamComponent
    },
    {
        path: 'donhang', component: DonhangComponent
    },
    {
        path: 'donhanginfo', children: [
            { path: '', component: DonhangDetailComponent },
            { path: 'edit/:id', component: DonhangDetailComponent }
        ]
    },
    {
        path: 'khachhang', component: KhachhangComponent
    },
    {
        path: 'khachhanginfo', children: [
            { path: '', component: KhachhangDetailComponent },
            { path: 'edit/:id', component: KhachhangDetailComponent }
        ]
    }


];
