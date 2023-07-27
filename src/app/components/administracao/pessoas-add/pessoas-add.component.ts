import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Utilizador } from 'src/app/models/utilizador';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-pessoas-add',
  templateUrl: './pessoas-add.component.html',
  styleUrls: ['./pessoas-add.component.css'],
})
export class PessoasAddComponent implements OnInit {
  addForm!: FormGroup;
  person: Person = new Person();
  user: Utilizador = new Utilizador();

  loading = false;
  errorForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: GeneralService
  ) {}

  ngOnInit(): void {
    this.person = new Person();
    this.addForm = this._formBuilder.group({
      name: ['', Validators.required],
      bornAt: [''],
      email: ['', Validators.required],
      phone: [''],
      extension: [''],
      areaId: [''],
      functionId: [''],
      photoUrl: [''],
      username: [''],
      password: [''],
    });
  }

  salvar() {
    if (!this.addForm.valid) {
      return;
    }
    this.loading = true;

    this.person.name = this.addForm.value.name;
    this.person.bornAt = new Date(this.addForm.value.bornAt).toISOString();
    this.person.email = this.addForm.value.email;
    this.person.phone = this.addForm.value.phone;
    this.person.extension = this.addForm.value.extension;
    this.person.areaId = this.addForm.value.areaId;
    this.person.functionId = this.addForm.value.functionId;
    this.person.photoUrl = this.addForm.value.photoUrl
      ? this.addForm.value.photoUrl
      : 'https://cloud.squidex.io/api/assets/intranet-vianet/816ab0fa-6f0f-4f40-8fcd-4f564f9a81bf/person.png?version=0';
    this.person.address = this.person.extension;

    this.user.email = this.addForm.value.email;
    this.user.username = this.addForm.value.username;
    this.user.password = this.addForm.value.password;
    this.user.permissions = [];
    this.user.roles = [];

    this.loading = true;

    this.service.postter('users', this.user).subscribe(
      (res) => {
        this.person.userUuid = res.uuid;

        this.service.postter('persons', this.person).subscribe(
          (res) => {
            this.person = res;
            this.router.navigate(['/admin']);
          },
          (error) => {
            this.loading = false;
          }
        );
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
