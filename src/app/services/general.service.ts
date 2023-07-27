import { GeneralConstants } from './../constants/GeneralConstants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  baseUrl = 'https://api-intranet.laboro.click/api/';

  headers?: {
    responseType: 'json';
    'Content-Type': 'application/json-patch+json; charset=utf-8';
  };

  constructor(private http: HttpClient) {}

  postter(url:string, data:any): Observable<any> {
    return this.http.post(this.baseUrl + url, data, {
      headers: this.headers,
    });
  }

  putter(url:string, data:any): Observable<any> {
    return this.http.put(this.baseUrl + url, data, {
      headers: this.headers,
    });
  }

  patcher(url:string, body:any): Observable<any> {
    return this.http.patch(this.baseUrl + url, body, this.headers);
  }

  getter(url:string): Observable<any> {
    return this.http.get(this.baseUrl + url);
  }

}
