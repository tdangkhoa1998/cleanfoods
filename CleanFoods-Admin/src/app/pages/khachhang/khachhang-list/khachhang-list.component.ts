import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { KhachhangService } from 'app/shared/services/khachhang.service';
import { Khachhang } from 'app/shared/models/khachhang.model';
import { KhachhangDetailComponent } from '../khachhang-detail/khachhang-detail.component';

@Component({
  selector: 'app-khachhang-list',
  templateUrl: './khachhang-list.component.html',
  styleUrls: ['./khachhang-list.component.scss']
})
export class KhachhangListComponent implements OnInit {


  constructor(private khachhangService: KhachhangService,
    private dialog: MatDialog) { }


  displayedColumns: string[] = ['TenKhachHang', 'Email', 'SoDienThoai', 'DiaChi', 'GioiTinh', 'actions'];

  // listData: MatTableDataSource<any>;
  // @ViewChild(MatSort, null) sort: MatSort;
  // @ViewChild(MatPaginator, null) paginator: MatPaginator;

  searchKey: string;

  ngOnInit() {

    // this.khachhangService.getKhachHangList().then(res => {
    //   this.listData = new MatTableDataSource(res as Khachhang[]);
    //   this.listData.sort = this.sort;
    //   this.listData.paginator = this.paginator;
    // })

    this.khachhangService.refreshListKhachHang();


  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.khachhangService.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row) {
    this.khachhangService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";

    this.dialog.open(KhachhangDetailComponent, dialogConfig).afterClosed().subscribe(res => {
      this.khachhangService.refreshListKhachHang();
    });
  }

}
