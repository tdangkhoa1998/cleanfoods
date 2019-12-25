import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sanpham } from '../shared/models/sanpham.model';
import { SanphamService } from '../shared/services/sanpham.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderProductComponent } from '../homepage/order-product/order-product.component';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent implements OnInit {

  sanphamList: Sanpham[];

  constructor(private sanphamService: SanphamService,
    private router: Router,
    private diaglog: MatDialog,
    private toastr: ToastrService) { }

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
