import { Component, OnInit } from '@angular/core';
import { Giohang } from '../shared/models/giohang.model';
import { DonhangService } from '../shared/services/donhang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private donhangService: DonhangService) { }

  ngOnInit() {
    this.donhangService.getGioHangNull();
  }

}
