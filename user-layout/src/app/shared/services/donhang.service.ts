import { Injectable } from '@angular/core';
import { Donhang } from '../models/donhang.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Giohang } from '../models/giohang.model';
import { Khachhang } from '../models/khachhang.model';

@Injectable({
  providedIn: 'root'
})
export class DonhangService {

  donHang: Donhang;
  giohangList: Giohang[];
  khachHang: Khachhang;
  cartAmount: number = 0;

  constructor(private http: HttpClient,
  ) { }

  getGioHangNull() {
    return this.http.get(environment.ApiURL + '/GetListCart').toPromise().then(res => {
      this.giohangList = res as Giohang[];
      this.cartAmount = this.giohangList.length;
    })
  }

  getGioHangByID(id: number) {
    return this.http.get(environment.ApiURL + '/GioHang/' + id).toPromise();
  }

  refreshGioHang() {
    return this.http.get(environment.ApiURL + '/RefreshGetListCart').toPromise().then(res => {
      this.giohangList = res as Giohang[];
    });
  }

  putGioHang(id: number, giohang: Giohang){
    return this.http.put(environment.ApiURL + '/GioHang/' + id,giohang).toPromise();
  }

  getGioHang() {
    return this.http.get(environment.ApiURL + '/GetListCart').toPromise();
  }

  deleteGioHangNull(id: number) {
    return this.http.delete(environment.ApiURL + '/GioHang/' + id);
  }

  postGioHangNull(giohang: Giohang) {
    return this.http.post(environment.ApiURL + '/GioHang', giohang).toPromise();
  }

  postDonHang(donhang: Donhang) {
    return this.http.post(environment.ApiURL + '/DonHang', donhang);
  }

  postKhachHang(formData: Khachhang) {
    return this.http.post(environment.ApiURL + '/KhachHang', formData);
  }

}
