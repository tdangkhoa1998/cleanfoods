import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/sanpham', title: 'Sản Phẩm', icon: 'nc-bank', class: '' },
    { path: '/nhomhang', title: 'Nhóm Hàng', icon: 'nc-bank', class: '' },
    { path: '/thuonghieu', title: 'Thương Hiệu', icon: 'nc-bank', class: '' },
    { path: '/khuyenmai', title: 'Khuyến Mãi', icon: 'nc-bank', class: '' },
    { path: '/donhang', title: 'Đơn Hàng', icon: 'nc-bank', class: '' },
    { path: '/khachhang', title: 'Danh Sách Khách Hàng', icon: 'nc-bank', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
