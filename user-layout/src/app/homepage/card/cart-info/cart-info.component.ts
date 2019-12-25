import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DonhangService } from 'src/app/shared/services/donhang.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PayMethodComponent } from '../pay-method/pay-method.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit {

  constructor(private donhangService: DonhangService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();

    this.donhangService.khachHang = {
      idKhachHang: null,
      TenKhachHang: "",
      SoDienThoai: 0,
      Email: "",
      DiaChi: "",
      GioiTinh: ""
    }

  }

  onSubmit(form: NgForm) {
    this.donhangService.postKhachHang(form.value).subscribe(res => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      let idKhachHang = form.value.idKhachHang;
      dialogConfig.data = idKhachHang;
      this.dialog.open(PayMethodComponent, dialogConfig).afterClosed().subscribe(res => {
        this.donhangService.refreshGioHang();
        this.router.navigate(['/home']);
        this.resetForm();
      });
    })
  }
}
