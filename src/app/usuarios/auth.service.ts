import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario:Usuario):Observable<any>{
    const urlEndPoint = "http://localhost:8080/oauth/token";
    const credencialesApp = btoa("angularapp" + ":" + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic '+ credencialesApp});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(urlEndPoint,params.toString(), {headers: httpHeaders});
  }
}
