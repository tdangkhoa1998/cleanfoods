import { Component, OnInit } from '@angular/core';
import { ThuonghieuService } from 'app/shared/services/thuonghieu.service';
import { ToastrService } from 'ngx-toastr';
import { Thuonghieu } from 'app/shared/models/thuonghieu.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-thuonghieu-list',
  templateUrl: './thuonghieu-list.component.html',
  styleUrls: ['./thuonghieu-list.component.scss']
})
export class ThuonghieuListComponent implements OnInit {

  constructor(private thuonghieuService: ThuonghieuService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.thuonghieuService.refreshList();
  }


  populateForm(thuonghieu: Thuonghieu) {
    this.thuonghieuService.formData = Object.assign({}, thuonghieu);
  }

  onDelete(id: number) {
    if (confirm("Bạn có chắc muốn xóa thương hiệu này???")) {
      this.thuonghieuService.deleteThuongHieu(id).subscribe(res => {
        this.thuonghieuService.refreshList();
        this.resetForm();
        this.toastr.warning("Xóa Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      })
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.thuonghieuService.formData = {
      idThuongHieu: null,
      TenThuongHieu: ""
    }
  }
}
