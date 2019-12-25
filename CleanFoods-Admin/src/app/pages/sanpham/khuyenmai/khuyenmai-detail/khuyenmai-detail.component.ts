import { Component, OnInit } from '@angular/core';
import { KhuyenmaiService } from 'app/shared/services/khuyenmai.service';
import { SanphamService } from 'app/shared/services/sanpham.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-khuyenmai-detail',
  templateUrl: './khuyenmai-detail.component.html',
  styleUrls: ['./khuyenmai-detail.component.scss']
})
export class KhuyenmaiDetailComponent implements OnInit {


  year: string = new Date().getFullYear().toString();
  month: string = new Date().getMonth().toString() + '/';
  date: string = new Date().getDate().toString() + '/';

  toDay: string = this.date + this.month + this.year;

  constructor(private khuyenmaiService: KhuyenmaiService,
    private sanphamService: SanphamService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.sanphamService.refreshList();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.khuyenmaiService.formData = {
      idKhuyenMai: null,
      idSanPham: 0,
      PhanTramKM: 0,
      NgayBD: this.toDay,
      NgayKT: this.toDay
    }
  }

  onSubmit(form?: NgForm) {
    if (form.value.idKhuyenMai == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.khuyenmaiService.postKhuyenMai(form.value).subscribe(res => {
      this.toastr.success("Thêm Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      this.resetForm(form);
      this.khuyenmaiService.refreshList();
    })
  }

  updateRecord(form: NgForm) {
    this.khuyenmaiService.putKhuyenMai(form.value).subscribe(res => {
      this.toastr.info("Cập Nhật Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      this.resetForm(form);
      this.khuyenmaiService.refreshList();
    })
  }


}
