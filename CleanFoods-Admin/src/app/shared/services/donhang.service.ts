import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Giohang } from '../models/giohang.model';
import { Donhang } from '../models/donhang.model';
import { Khachhang } from '../models/khachhang.model';

@Injectable({
  providedIn: 'root'
})
export class DonhangService {

  formData: Donhang;
  giohangList: Giohang[];
  khachHang: Khachhang;
  khachhangList: Khachhang[];

  constructor(private http: HttpClient) { }

  getDonHang() {
    return this.http.get(environment.ApiURL + '/DonHang').toPromise();
  }

  getDonHangByID(id: number): any {
    return this.http.get(environment.ApiURL + '/DonHang/' + id).toPromise();
  }

  refreshGioHang() {
    return this.http.get(environment.ApiURL + '/GioHang').toPromise();
  }

  saveOrUpdateDonHang() {
    var body = {
      ...this.formData,
      KhachHang: this.khachHang,
      GioHangs: this.giohangList
    }

    return this.http.post(environment.ApiURL + '/PostDonHang', body);
  }

  deleteDonHang(id: number) {
    return this.http.delete(environment.ApiURL + '/DonHang/' + id).toPromise();
  }

  getKhachHang() {
    return this.http.get(environment.ApiURL + '/KhachHang').toPromise();
  }






}
