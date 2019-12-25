import { Component, OnInit } from '@angular/core';
import { SanphamService } from 'app/shared/services/sanpham.service';
import { ToastrService } from 'ngx-toastr';
import { Sanpham } from 'app/shared/models/sanpham.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sanpham-list',
  templateUrl: './sanpham-list.component.html',
  styleUrls: ['./sanpham-list.component.scss']
})
export class SanphamListComponent implements OnInit {

  constructor(private sanphamService: SanphamService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.sanphamService.refreshList();
  }

  populateForm(sanpham: Sanpham) {
    this.sanphamService.formData = Object.assign({}, sanpham);
  }

  onDelete(id: number) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này???")) {
      this.sanphamService.deleteSanPham(id).subscribe(res => {
        this.sanphamService.refreshList();
        this.resetForm();
        this.toastr.warning("Xóa Sản Phẩm Thành Công", "Quản Lí Bách Hóa");
      })
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.sanphamService.formData = {
      idSanPham: null,
      idNhomHang: null,
      idThuongHieu: null,
      TenSanPham: "",
      HinhAnh: "",
      NoiDung: "",
      GiaBan: 0
    }
  }


}
