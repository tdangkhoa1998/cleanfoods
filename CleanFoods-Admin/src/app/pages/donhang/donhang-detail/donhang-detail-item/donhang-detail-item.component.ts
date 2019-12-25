import { Component, OnInit, Inject } from '@angular/core';
import { SanphamService } from 'app/shared/services/sanpham.service';
import { DonhangService } from 'app/shared/services/donhang.service';
import { NgForm } from '@angular/forms';
import { Giohang } from 'app/shared/models/giohang.model';
import { Sanpham } from 'app/shared/models/sanpham.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DonhangComponent } from '../../donhang.component';

@Component({
  selector: 'app-donhang-detail-item',
  templateUrl: './donhang-detail-item.component.html',
  styleUrls: ['./donhang-detail-item.component.scss']
})
export class DonhangDetailItemComponent implements OnInit {

  sanphamList;
  formData: Giohang;

  constructor(private sanphamService: SanphamService,
    private donhangService: DonhangService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DonhangComponent>) { }

  ngOnInit() {
    this.sanphamService.getSanPham().then(res => {
      this.sanphamList = res as Sanpham[]
    })

    if (this.data.giohangIndex == null) {
      this.resetForm();
    }
    else {
      this.formData = Object.assign({}, this.donhangService.giohangList[this.data.giohangIndex]);
    }

  }

  resetForm(form?: NgForm) {

    if (form = null)
      form.resetForm();

    this.formData = {
      idGioHang: null,
      idDonHang: this.data.idDonHang,
      idSanPham: 0,
      SanPhamName: "",
      SoLuong: 0,
      SanPhamPrice: 0,
      TongTien: 0
    }
  }

  updateGiaTien(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.SanPhamPrice = 0;
      this.formData.SanPhamName = "";
    }
    else {
      this.formData.SanPhamPrice = this.sanphamList[ctrl.selectedIndex - 1].GiaBan;
      this.formData.SanPhamName = this.sanphamList[ctrl.selectedIndex - 1].TenSanPham;
    }
    this.updateTongTien();
  }

  updateTongTien() {
    this.formData.TongTien = this.formData.SoLuong * this.formData.SanPhamPrice;
  }

  onSubmit(form: NgForm) {
    if (this.data.giohangIndex == null)
      this.donhangService.giohangList.push(form.value);
    else
      this.donhangService.giohangList[this.data.giohangIndex] = form.value;
    this.dialogRef.close();
  }

}
