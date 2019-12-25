import { Injectable } from '@angular/core';
import { Nhomhang } from '../models/nhomhang.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NhomhangService {

  formData: Nhomhang;
  nhomhangList: Nhomhang[];

  constructor(private http: HttpClient) {
  }

  //Thêm Nhóm Hàng
  postNhomHang(formData: Nhomhang) {
    return this.http.post(environment.ApiURL + '/NhomHang', formData);
  }

  //Cập nhật nhóm hàng
  putNhomHang(formData: Nhomhang) {
    return this.http.put(environment.ApiURL + '/NhomHang/' + formData.idNhomHang, formData);
  }

  //Xóa nhóm hàng
  deleteNhomHang(id: number) {
    return this.http.delete(environment.ApiURL + '/NhomHang/' + id);
  }

  // getNhomHangByIDDanhMuc(id: number) {
  //   return this.http.get(environment.ApiURL + '/NhomHang/GetByDM/' + id)
  //     .toPromise().then(res => this.nhomhangList = res as Nhomhang[]);
  // }

  //Cập nhật danh sách nhóm hàng
  refreshList() {
    this.http.get(environment.ApiURL + '/NhomHang')
      .toPromise().then(res => this.nhomhangList = res as Nhomhang[]);
  }


}
