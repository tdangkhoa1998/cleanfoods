import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DonhangService } from 'src/app/shared/services/donhang.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomepageComponent } from '../../homepage.component';
import { Giohang } from 'src/app/shared/models/giohang.model';
@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.component.html',
  styleUrls: ['./pay-method.component.css']
})
export class PayMethodComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<HomepageComponent>,
    private donhangService: DonhangService,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.donhangService.donHang = {
      idDonHang: null,
      idKhachHang: null,
      MaSoDonHang: Math.floor(100000 + Math.random() * 900000),
      PhuongThucThanhToan: "",
      TongTien: 0,
      TrangThai: "Đã thanh toán",
      NgayXacNhanDonHang: " "
    }
  }
  onSubmit(form: NgForm) {
    this.donhangService.postDonHang(form.value).subscribe(res => {
      this.toastr.success("Thêm đơn hàng thành công", "Clean Food");
      this.dialogRef.close();
    });
  }

}
