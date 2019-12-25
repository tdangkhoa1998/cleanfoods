import { Injectable } from '@angular/core';
import { Khuyenmai } from '../models/khuyenmai.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhuyenmaiService {


  formData: Khuyenmai;
  khuyenmaiList: Khuyenmai[];
  constructor(private http: HttpClient) { }

  postKhuyenMai(formData: Khuyenmai) {
    return this.http.post(environment.ApiURL + '/KhuyenMai', formData);
  }

  putKhuyenMai(formData: Khuyenmai) {
    return this.http.put(environment.ApiURL + '/KhuyenMai/' + formData.idKhuyenMai, formData);
  }

  deleteKhuyenMai(id: number) {
    return this.http.delete(environment.ApiURL + '/KhuyenMai/' + id);
  }

  refreshList() {
    this.http.get(environment.ApiURL + '/KhuyenMai')
      .toPromise().then(res => this.khuyenmaiList = res as Khuyenmai[]);
  }

}
