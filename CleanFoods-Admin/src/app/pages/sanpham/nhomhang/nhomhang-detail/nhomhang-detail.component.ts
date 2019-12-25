import { Component, OnInit } from '@angular/core';
import { NhomhangService } from 'app/shared/services/nhomhang.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nhomhang-detail',
  templateUrl: './nhomhang-detail.component.html',
  styleUrls: ['./nhomhang-detail.component.scss']
})
export class NhomhangDetailComponent implements OnInit {

  constructor(private nhomhangService: NhomhangService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.nhomhangService.formData = {
      idNhomHang: null,
      TenNhomHang: ""
    }
  }

  onSubmit(form?: NgForm) {
    if (form.value.idNhomHang == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.nhomhangService.postNhomHang(form.value).subscribe(res => {
      this.toastr.success("Thêm Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      this.resetForm(form);
      this.nhomhangService.refreshList();
    })
  }

  updateRecord(form: NgForm) {
    this.nhomhangService.putNhomHang(form.value).subscribe(res => {
      this.toastr.info("Cập Nhật Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      this.resetForm(form);
      this.nhomhangService.refreshList();
    })
  }


}
