import { Component, OnInit } from '@angular/core';
import { Sanpham } from '../shared/models/sanpham.model';
import { SanphamService } from '../shared/services/sanpham.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailComponent } from '../home-product/product-detail/product-detail.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  sanphamList: Sanpham[];

  constructor(private sanphamService: SanphamService,
    private router: Router,
    private diaglog: MatDialog
  ) { }

  ngOnInit() {
    this.sanphamService.getSanPhamList().then(res => {
      this.sanphamList = res as Sanpham[];
    })
  }

  onViewDetail(id: number) {
    this.router.navigate(['/home-product/detail/' + id]);
  }

  onAddSanPhamToCart(idSanPham) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = { idSanPham };
    this.diaglog.open(OrderProductComponent, dialogConfig);
  }


}
