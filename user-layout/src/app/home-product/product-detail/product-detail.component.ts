import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sanpham } from 'src/app/shared/models/sanpham.model';
import { SanphamService } from 'src/app/shared/services/sanpham.service';
import { Giohang } from 'src/app/shared/models/giohang.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DonhangService } from 'src/app/shared/services/donhang.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  formData: Giohang;
  sanphamDetail: Sanpham;

  constructor(private sanphamService: SanphamService,
    private donhangService: DonhangService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {

    let sanphamID = this.currentRoute.snapshot.paramMap.get('id');

    this.resetForm();
    this.sanphamService.getSanPhamByID(parseInt(sanphamID)).then(res => {
      this.sanphamDetail = res as Sanpham
    });

  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formData = {
      idGioHang: null,
      idDonHang: null,
      idSanPham: parseInt(this.currentRoute.snapshot.paramMap.get('id')),
      SoLuong: 1,
      TenSanPham: "",
      GiaBan: 0,
      NoiDung: "",
      TongTien: 0
    }

  }

  onSubmit(form: NgForm) {
    this.donhangService.postGioHangNull(form.value).then(res => {
      this.donhangService.getGioHangNull();
      this.toastr.success("Thêm sản phẩm thành công", "CleanFoods");
    })

  }


}
