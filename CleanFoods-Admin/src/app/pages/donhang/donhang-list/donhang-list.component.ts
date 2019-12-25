import { Component, OnInit } from '@angular/core';
import { Donhang } from 'app/shared/models/donhang.model';
import { DonhangService } from 'app/shared/services/donhang.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donhang-list',
  templateUrl: './donhang-list.component.html',
  styleUrls: ['./donhang-list.component.scss']
})
export class DonhangListComponent implements OnInit {

  donhangList: Donhang[] = [];

  constructor(private donhangService: DonhangService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.donhangService.getDonHang().then(res => {
      this.donhangList = res as Donhang[]
    })
  }

  openForEdit(idDonHang: number) {
    this.router.navigate(['/donhanginfo/edit/' + idDonHang]);
  }

  onDonHangDelete(id: number) {
    if (confirm('Bạn có chắc muốn xóa đơn hàng này???')) {
      this.donhangService.deleteDonHang(id).then(res => {
        this.refreshList();
        this.toastr.warning("Xóa đơn hàng thành công", "Clean Foods");
      })
    }
  }



}
