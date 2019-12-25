import { Component, OnInit } from '@angular/core';
import { KhuyenmaiService } from 'app/shared/services/khuyenmai.service';
import { ToastrService } from 'ngx-toastr';
import { Khuyenmai } from 'app/shared/models/khuyenmai.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-khuyenmai-list',
  templateUrl: './khuyenmai-list.component.html',
  styleUrls: ['./khuyenmai-list.component.scss']
})
export class KhuyenmaiListComponent implements OnInit {

  constructor(private khuyenmaiService: KhuyenmaiService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.khuyenmaiService.refreshList();
  }


  populateForm(khuyenmai: Khuyenmai) {
    this.khuyenmaiService.formData = Object.assign({}, khuyenmai);
  }

  onDelete(id: number) {
    if (confirm("Bạn có chắc muốn xóa thương hiệu này???")) {
      this.khuyenmaiService.deleteKhuyenMai(id).subscribe(res => {
        this.khuyenmaiService.refreshList();
        this.resetForm();
        this.toastr.warning("Xóa Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      })
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.khuyenmaiService.formData = {
      idKhuyenMai: null,
      idSanPham: 0,
      PhanTramKM: 0,
      NgayBD: "2019/10/31",
      NgayKT: "2019/10/31"
    }
  }
}

