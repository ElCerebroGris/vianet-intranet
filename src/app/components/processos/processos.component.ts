import { Component, OnInit } from '@angular/core';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Process } from 'src/app/models/process';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.css'],
})
export class ProcessosComponent implements OnInit {
  loading = true;
  processos: Process[] = [];
  areaId = 0;

  constructor(private service: GeneralService, private auth: AuthService) {}

  ngOnInit(): void {
    this.areaId = Number(this.auth.getAreaId());
    this.carregar();
  }

  carregar() {
    this.service.getter('processes').subscribe(
      (res) => {
        this.processos = res.content;
        if (this.areaId != 0) {
          this.processos = this.processos.filter(
            (p) => p.areaId == this.areaId
          );
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getArea(id: number) {
    return GeneralConstants.AREAS.getInfo(id);
  }
}
