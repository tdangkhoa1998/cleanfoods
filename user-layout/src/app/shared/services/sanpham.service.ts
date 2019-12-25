import { Injectable } from '@angular/core';
import { Sanpham } from '../models/sanpham.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SanphamService {

  constructor(private http: HttpClient) { }

  getSanPhamList() {
    return this.http.get(environment.ApiURL + '/SanPham').toPromise();
  }

  getSanPhamByID(id: number){
    return this.http.get(environment.ApiURL + '/SanPham/' + id).toPromise();
  }

}
