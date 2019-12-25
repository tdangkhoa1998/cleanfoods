import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Thuonghieu } from '../models/thuonghieu.model';

@Injectable({
  providedIn: 'root'
})
export class ThuonghieuService {

  formData: Thuonghieu;
  thuonghieuList: Thuonghieu[];

  constructor(private http: HttpClient) {
  }

  postThuongHieu(formData: Thuonghieu) {
    return this.http.post(environment.ApiURL + '/ThuongHieux', formData);
  }

  putThuongHieu(formData: Thuonghieu) {
    return this.http.put(environment.ApiURL + '/ThuongHieux/' + formData.idThuongHieu, formData);
  }

  deleteThuongHieu(id: number) {
    return this.http.delete(environment.ApiURL + '/ThuongHieux/' + id);
  }

  getThuongHieuList() {
    return this.http.get(environment.ApiURL + '/ThuongHieux').toPromise();
  }
  
  refreshList() {
    this.http.get(environment.ApiURL + '/ThuongHieux')
      .toPromise().then(res => this.thuonghieuList = res as Thuonghieu[]);
  }
}
