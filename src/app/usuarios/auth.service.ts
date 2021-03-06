import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario:Usuario;
  private _token:string;
  constructor(private http: HttpClient) { }

  public get usuario(): Usuario{
  if (this._usuario != null) {
    return this._usuario;
  } else if (this._usuario == null && localStorage.getItem('usuario') != null){
    this._usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    return this._usuario;
  }
    return new Usuario();
}
  public get token():string{
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null){
      this._token = localStorage.getItem('token');
      return this._token;
    }
    return null;
  }
  login(usuario:Usuario):Observable<any>{
    const urlEndPoint = "http://localhost:8044/oauth/token";
    const credencialesApp = btoa("angularapp" + ":" + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic '+ credencialesApp});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(urlEndPoint,params.toString(), {headers: httpHeaders});
  }

  guardarusuario(token:string):void{
    this._usuario = new Usuario();
    this._usuario.nombre = this.obtenerDatosToken(token).nombre;
    this._usuario.apellido = this.obtenerDatosToken(token).apellido;
    this._usuario.email = this.obtenerDatosToken(token).email;
    this._usuario.username = this.obtenerDatosToken(token).user_name;
    this._usuario.roles = this.obtenerDatosToken(token).authorities;
    localStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(token:string):void{
    this._token = token;
    localStorage.setItem('token', token);
  }

  obtenerDatosToken(access_token:string):any{
    if (access_token != null){
    return JSON.parse(atob(access_token.split(".")[1]));
    }
    return null;
  }

  isAuthenticated():boolean{
  let payload = this.obtenerDatosToken(this.token);
  if(payload != null && payload.user_name && payload.user_name.length > 0){
    return true;
  }
  return false;
}

cerrarSession():void{
  this._token = null;
  this._usuario = null;
  localStorage.clear();
}
hasRole(role:string):boolean{
  if (this.usuario.roles.includes(role)){
    return true;
  }
  return false;
}

}
