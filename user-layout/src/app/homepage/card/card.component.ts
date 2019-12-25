import { Component, OnInit } from '@angular/core';
import { Giohang } from 'src/app/shared/models/giohang.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DonhangService } from 'src/app/shared/services/donhang.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CartInfoComponent } from './cart-info/cart-info.component';
import { ChangesoluongComponent } from './changesoluong/changesoluong.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  totalSanPham: number = 0;
  phiGiaoHang: number = 0;
  giohangList: Giohang[];
  cartAmount: number;
  giohangItem: Giohang;

  constructor
    (private dialog: MatDialog,
      private toastr: ToastrService,
      private router: Router,
      private donhangService: DonhangService,
      private diaglog: MatDialog) {
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.donhangService.getGioHangNull().then(res => {
      this.cartAmount = this.donhangService.giohangList.length;
      this.totalSanPham = this.donhangService.giohangList.reduce((prev, curr) => {
        return prev + curr.TongTien;
      }, 0)


      if (this.totalSanPham == 0) {
        this.phiGiaoHang = 0;
      }
      else if (this.totalSanPham > 0 && this.totalSanPham < 1000000) {
        this.phiGiaoHang = 50000;
      }
      else {
        this.phiGiaoHang = 20000;
      }

    });
  }

  onDeleteItem(id: number) {
    this.donhangService.deleteGioHangNull(id).subscribe(res => {
      this.donhangService.getGioHangNull();
      this.refreshList();
      this.toastr.warning("Xóa sản phẩm khỏi giỏ hàng thành công", "CleanFoods");
    })
  }

  onChangeSoLuong(id: number, idSanPham: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = { id, idSanPham };
    this.diaglog.open(ChangesoluongComponent, dialogConfig).afterClosed().subscribe(res => {
  
      this.refreshList();
    })
  }


}
