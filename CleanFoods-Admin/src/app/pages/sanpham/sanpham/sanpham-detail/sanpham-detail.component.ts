import { Component, OnInit } from '@angular/core';
import { SanphamService } from 'app/shared/services/sanpham.service';
import { NhomhangService } from 'app/shared/services/nhomhang.service';
import { ThuonghieuService } from 'app/shared/services/thuonghieu.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sanpham-detail',
  templateUrl: './sanpham-detail.component.html',
  styleUrls: ['./sanpham-detail.component.scss']
})
export class SanphamDetailComponent implements OnInit {

  imageURL: string = "../../../../../assets/img/import_1310156.png";
  fileUpload: File = null;
  constructor(private sanphamService: SanphamService,
    private nhomhangService: NhomhangService,
    private thuonghieuService: ThuonghieuService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.nhomhangService.refreshList();
    this.thuonghieuService.refreshList();
    this.sanphamService.refreshList();
    this.resetForm();
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

  handleFileInput(file: FileList) {
    this.fileUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload);

  }

  onSubmit(form: NgForm) {
    if (form.value.idSanPham == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    // this.sanphamService.postSanPham(form.value).subscribe(res => {

    //   this.toastr.success("Thêm Sản Phẩm Thành Công", "Quản Lí Bách Hóa");
    //   this.sanphamService.refreshList();
    //   this.resetForm(form);
    //   this.imageURL = "../../../../assets/img/import_1310156.png"
    // })

    this.sanphamService.postFile(form.value, this.fileUpload).subscribe(
      data => {
        this.toastr.success("Thêm Sản Phẩm Thành Công", "Quản Lí Bách Hóa");
        this.sanphamService.refreshList();
        console.log("Done");
        this.resetForm();
        this.imageURL = "../../../../../assets/img/import_1310156.png";
      }
    )

  }

  updateRecord(form: NgForm) {
    this.sanphamService.putSanPham(form.value).subscribe(res => {
      this.toastr.info("Cập Nhật Sản Phẩm Thành Công", "Quản Lí Bách Hóa");
      this.sanphamService.refreshList();
      this.resetForm(form);
      this.imageURL = "../../../../../assets/img/import_1310156.png"
    })
  }

}
