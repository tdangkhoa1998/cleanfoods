import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Khachhang } from '../models/khachhang.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {

  formData: Khachhang;

  listData: MatTableDataSource<any>;
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  getKhachHangList() {
    return this.http.get(environment.ApiURL + '/KhachHang').toPromise();
  }

  refreshListKhachHang(){
    return this.http.get(environment.ApiURL + '/KhachHang').toPromise().then(res => {
      this.listData = new MatTableDataSource(res as Khachhang[]);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  populateForm(row) {
    this.formData = Object.assign({}, row);
  }

  putKhachHang(khachhang: Khachhang){
    return this.http.put(environment.ApiURL + '/KhachHang/' + khachhang.idKhachHang,khachhang);
  }



}
