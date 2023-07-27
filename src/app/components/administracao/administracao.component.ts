import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Permission } from 'src/app/models/permission';
import { Person } from 'src/app/models/person';
import { Utilizador } from 'src/app/models/utilizador';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css'],
})
export class AdministracaoComponent implements OnInit {
  loading = true;
  persons: Person[] = [];
  permissions: Permission[] = [];
  areas = GeneralConstants.AREAS.toArray();

  constructor(
    private service: GeneralService
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('auth/permissions').subscribe(
      (res) => {
        this.permissions = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
    this.service.getter('persons').subscribe(
      (res) => {
        this.persons = res.content;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );

  }
}
