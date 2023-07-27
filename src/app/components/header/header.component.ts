import { Component, OnInit } from '@angular/core';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  area: string = '';
  areaId = 0;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName()!;
    this.areaId = Number(this.auth.getAreaId());
    this.area = GeneralConstants.AREAS.getInfo(this.areaId);
  }

  logout() {
    this.auth.logout();
  }
}
