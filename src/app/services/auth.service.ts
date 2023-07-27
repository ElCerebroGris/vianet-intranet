import { Utilizador } from '../models/utilizador';
import { GeneralConstants } from './../constants/GeneralConstants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, empty, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://api-intranet.laboro.click/api/auth/'
  headers?: {
    'responseType': 'json',
    'Content-Type': 'application/json; charset=utf-8'
  };

  private isUserLoged = new BehaviorSubject<boolean>(false);
  showMenu = new EventEmitter<boolean>();
  showMenuLateral = new EventEmitter<boolean>();
  flag = false;

  constructor(private http: HttpClient, private router: Router) { }

  postter(url:string, data:any): Observable<any> {
    return this.http.post(this.baseUrl + url, data, {
      headers: this.headers
    });
  }

  verifyUserLoged() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERID_KEY);
  }

  verifyUserAdmin() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.TIPOUSER_KEY) == '1';
  }

  setToken(usuario: Utilizador) {
    localStorage.setItem(GeneralConstants.USER_AUTH.TOKEN_KEY, usuario.token!);
    this.isUserLoged.next(true);
    this.showMenu.emit(true);
    this.showMenuLateral.emit(this.flag);
  }

  setLogin(usuario: Utilizador) {
    localStorage.setItem(GeneralConstants.USER_AUTH.USERID_KEY, usuario.uuid!);
    localStorage.setItem(GeneralConstants.USER_AUTH.TOKEN_KEY, usuario.token!);
    localStorage.setItem(GeneralConstants.USER_AUTH.USEREMAIL_KEY, usuario.email!);
    localStorage.setItem(GeneralConstants.USER_AUTH.USERNAME_KEY, usuario.username!);
    localStorage.setItem(GeneralConstants.USER_AUTH.TIPOUSER_KEY, usuario.tipo_user+"");
    localStorage.setItem(GeneralConstants.USER_AUTH.AREAUSER_KEY, usuario.areaId+"");
    this.isUserLoged.next(true);
    this.showMenu.emit(true);
    if(usuario.tipo_user == 1)
      this.showMenuLateral.emit(true);
  }

  logout() {
    localStorage.removeItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERID_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USEREMAIL_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.TIPOUSER_KEY);
    this.isUserLoged.next(false);
    this.showMenu.emit(false);
    this.showMenuLateral.emit(false);
    this.router.navigate(['/login']);
  }

  getUserName() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
  }

  getUserId() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERID_KEY);
  }

  getToken() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
  }

  getAreaId() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.AREAUSER_KEY);
  }
}
