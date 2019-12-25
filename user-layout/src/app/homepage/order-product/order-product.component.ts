import { Component, OnInit, Inject } from '@angular/core';
import { Giohang } from 'src/app/shared/models/giohang.model';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomepageComponent } from '../homepage.component';
import { ToastrService } from 'ngx-toastr';
import { DonhangService } from 'src/app/shared/services/donhang.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  formData: Giohang;

  constructor(private donhangService: DonhangService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<HomepageComponent>,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formData = {
      idGioHang: null,
      idDonHang: null,
      idSanPham: this.data.idSanPham,
      SoLuong: 1,
      TongTien: 0,
      TenSanPham: "",
      GiaBan: 0,
      NoiDung: ""
    }
  }

  onSubmit(form: NgForm) {
    this.donhangService.postGioHangNull(form.value).then(res => {
      this.donhangService.getGioHangNull();
      this.toastr.success("Thêm sản phẩm thành công", "CleanFoods");
      this.dialogRef.close();
    })
  }

}
