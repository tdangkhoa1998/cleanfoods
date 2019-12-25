import { Component, OnInit } from '@angular/core';
import { NhomhangService } from 'app/shared/services/nhomhang.service';
import { ToastrService } from 'ngx-toastr';
import { Nhomhang } from 'app/shared/models/nhomhang.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nhomhang-list',
  templateUrl: './nhomhang-list.component.html',
  styleUrls: ['./nhomhang-list.component.scss']
})
export class NhomhangListComponent implements OnInit {

  constructor(private nhomhangService: NhomhangService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.nhomhangService.refreshList();
  }


  populateForm(nhomhang: Nhomhang) {
    this.nhomhangService.formData = Object.assign({}, nhomhang);
  }

  onDelete(id: number) {
    if (confirm("Bạn có chắc muốn xóa thương hiệu này???")) {
      this.nhomhangService.deleteNhomHang(id).subscribe(res => {
        this.nhomhangService.refreshList();
        this.resetForm();
        this.toastr.warning("Xóa Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      })
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.nhomhangService.formData = {
      idNhomHang: null,
      TenNhomHang: ""
    }
  }
}

