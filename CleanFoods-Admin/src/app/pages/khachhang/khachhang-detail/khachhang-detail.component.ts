import { Component, OnInit } from '@angular/core';
import { Khachhang } from 'app/shared/models/khachhang.model';
import { KhachhangService } from 'app/shared/services/khachhang.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { KhachhangListComponent } from '../khachhang-list/khachhang-list.component';

@Component({
  selector: 'app-khachhang-detail',
  templateUrl: './khachhang-detail.component.html',
  styleUrls: ['./khachhang-detail.component.scss']
})
export class KhachhangDetailComponent implements OnInit {



  constructor(private khachhangService: KhachhangService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<KhachhangListComponent>) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    this.khachhangService.putKhachHang(form.value).subscribe(res => {
      this.toastr.info("Cập nhật thông tin khách hàng thành công", "Clean Foods");
    });
  
    this.dialogRef.close();
  }

}
