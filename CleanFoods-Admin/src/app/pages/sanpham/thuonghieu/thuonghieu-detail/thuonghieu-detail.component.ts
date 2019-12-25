import { Component, OnInit } from '@angular/core';
import { ThuonghieuService } from 'app/shared/services/thuonghieu.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-thuonghieu-detail',
  templateUrl: './thuonghieu-detail.component.html',
  styleUrls: ['./thuonghieu-detail.component.scss']
})
export class ThuonghieuDetailComponent implements OnInit {
  constructor(private thuonghieuService: ThuonghieuService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.thuonghieuService.formData = {
      idThuongHieu: null,
      TenThuongHieu: ""
    }
  }

  onSubmit(form?: NgForm) {
    if (form.value.idThuongHieu == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.thuonghieuService.postThuongHieu(form.value).subscribe(res => {
      this.toastr.success("Thêm Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      this.resetForm(form);
      this.thuonghieuService.refreshList();
    })
  }

  updateRecord(form: NgForm) {
    this.thuonghieuService.putThuongHieu(form.value).subscribe(res => {
      this.toastr.info("Cập Nhật Thương Hiệu Thành Công", "Quản Lí Bách Hóa");
      this.resetForm(form);
      this.thuonghieuService.refreshList();
    })
  }

}
