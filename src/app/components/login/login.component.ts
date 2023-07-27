import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Utilizador } from 'src/app/models/utilizador';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = new Utilizador();
  loginForm!: FormGroup;
  loading = false;
  errorForm = false;

  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private service: GeneralService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.auth.verifyUserLoged()) {
      this.router.navigate(['/']);
    }
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.loginForm?.valid) {
      return;
    }
    this.errorForm = false;
    this.loading = true;
    this.usuario.username = this.loginForm.value.email;
    this.usuario.password = this.loginForm.value.password;
    let data = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.auth.postter('login', data).subscribe(
      (res) => {
        this.usuario.token = res.jwtToken;
        this.usuario.uuid = res.uuid;
        this.loading = false;
        this.getPessoa();
      },
      (error) => {
        this.loading = false;
        this.errorForm = true;
        console.log(error);
      }
    );
  }

  getPessoa(): void {
    this.service.getter('persons').subscribe(
      (res) => {
        let persons: Person[] = res.content;
        let person = persons
          .filter((p) => p.userUuid == this.usuario.uuid)
          .pop();
        this.usuario.areaId = person != null ? person.areaId : 0;

        this.auth.setLogin(this.usuario);
        this.router.navigate(['/']);
      },
      (error) => {
        this.loading = false;
        this.errorForm = true;
        this.auth.setLogin(this.usuario);
        this.router.navigate(['/']);
      }
    );
  }
}
