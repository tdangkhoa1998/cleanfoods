import { Component, OnInit, Inject } from '@angular/core';
import { Giohang } from 'src/app/shared/models/giohang.model';
import { DonhangService } from 'src/app/shared/services/donhang.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardComponent } from '../card.component';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-changesoluong',
  templateUrl: './changesoluong.component.html',
  styleUrls: ['./changesoluong.component.css']
})
export class ChangesoluongComponent implements OnInit {

  formData: Giohang;

  constructor(private donhangService: DonhangService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CardComponent>,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formData = {
      idGioHang: this.data.id,
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
    this.donhangService.putGioHang(parseInt(this.data.id), form.value).then(res => {
      this.resetForm();
      this.dialogRef.close();
      this.toastr.info("Cập nhật số lượng thành công", "Clean Foods");
    })
  }

}
