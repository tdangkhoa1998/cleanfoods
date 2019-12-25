import { Component, OnInit } from '@angular/core';
import { DonhangService } from 'app/shared/services/donhang.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DonhangDetailItemComponent } from './donhang-detail-item/donhang-detail-item.component';

@Component({
  selector: 'app-donhang-detail',
  templateUrl: './donhang-detail.component.html',
  styleUrls: ['./donhang-detail.component.scss']
})
export class DonhangDetailComponent implements OnInit {

  constructor(private donhangService: DonhangService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {

    let idDonHang = this.currentRoute.snapshot.paramMap.get('id');

    if (idDonHang == null) {
      this.resetForm();
    }
    else {
      this.resetForm();
      this.donhangService.getDonHangByID(parseInt(idDonHang)).then(res => {
        this.donhangService.formData = res.donhang;
        this.donhangService.khachHang = res.khachhang;
        this.donhangService.giohangList = res.giohang;
      })
    }

  }

  resetForm(form?: NgForm) {

    if (form = null) {
      form.resetForm()
    }

    this.donhangService.khachHang = {
      idKhachHang: null,
      TenKhachHang: "",
      Email: "",
      DiaChi: "",
      GioiTinh: "Khác",
      SoDienThoai: 0
    }

    this.donhangService.formData = {
      idDonHang: null,
      idKhachHang: null,
      TenKhachHang: "",
      MaSoDonHang: Math.floor(100000 + Math.random() * 900000),
      PhuongThucThanhToan: "",
      TongTien: 0,
      TrangThai: "Đã thanh toán",
      NgayXacNhanDonHang: "",
      DeletedOrderItemIDs: ''
    }

    this.donhangService.giohangList = []

  }

  AddOrEditGioHang(giohangIndex, idDonHang) {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.autoFocus = true;
    dialogconfig.disableClose = true;
    dialogconfig.width = "50%";
    dialogconfig.data = { giohangIndex, idDonHang };
    this.dialog.open(DonhangDetailItemComponent, dialogconfig).afterClosed().subscribe(res => {
      this.updateTongTien();
    })
  }

  onDeleteGioHang(idGioHang: number, i: number) {
    if (idGioHang != null)
      this.donhangService.formData.DeletedOrderItemIDs += idGioHang + ",";
    this.donhangService.giohangList.splice(i, 1);
    this.updateTongTien();
  }

  updateTongTien() {
    this.donhangService.formData.TongTien = this.donhangService.giohangList.reduce((prev, curr) => {
      return prev + curr.TongTien;
    }, 0);
  }

  onSubmit(form: NgForm) {
    this.donhangService.saveOrUpdateDonHang().subscribe(res => {
      this.resetForm();
      this.toastr.success("Cập nhật đơn hàng thành công", "Clean Foods");
      this.router.navigate(['/donhang']);
    })
  }

}
