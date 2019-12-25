import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NhomhangService } from './nhomhang.service';
import { Sanpham } from '../models/sanpham.model';
import { environment } from 'environments/environment';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SanphamService {

  formData: Sanpham;
  sanphamList: Sanpham[];

  constructor(private http: HttpClient) {

  }

  postFile(form: Sanpham, fileToUpload: File) {
    const endpoint = "http://localhost:56111/api/PostSanPham/Image";
    const formData: FormData = new FormData();

    formData.append("TenSanPham", form.TenSanPham);
    formData.append("NoiDung", form.NoiDung);
    formData.append("HinhAnh", fileToUpload, fileToUpload.name);
    formData.append("GiaBan", form.GiaBan.toString());
    formData.append("idNhomHang", form.idNhomHang.toString());
    formData.append("idThuongHieu", form.idThuongHieu.toString());

    return this.http
      .post(endpoint, formData);
  }

  getSanPham(){
    return this.http.get(environment.ApiURL + '/SanPham').toPromise();
  }

  putSanPham(formData: Sanpham) {
    return this.http.put(environment.ApiURL + '/SanPham/' + formData.idSanPham, formData);
  }

  deleteSanPham(id: number) {
    return this.http.delete(environment.ApiURL + '/SanPham/' + id);
  }

  refreshList() {
    this.http.get(environment.ApiURL + '/SanPham')
      .toPromise().then(res => this.sanphamList = res as Sanpham[]);
  }














}
