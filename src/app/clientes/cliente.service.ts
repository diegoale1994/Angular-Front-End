import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8044/api/clientes'
  //private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  /*private AddAuthorizationHeader(){
    let token = this.auth.token;
    if( token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }*/ //metodo cambiado con la implementacion de httpInterceptor

  /*private isNoAutorizado(e): boolean { //401 - No autorizado 403 - recurso prohibido metodo optimizado con httpInterceptor
    if (e.status == 401) {

      if(this.auth.isAuthenticated()){
        this.auth.cerrarSession();
      }

      this.router.navigate(['/login'])
      return true;
    }

    if (e.status == 403) {
      Swal('Acceso denegado','Hola '+this.auth.usuario.nombre+" no tienes los suficientes permisos para acceder a este recurso",'warning');
      this.router.navigate(['/clientes'])
      return true;
    }
    return false;
  }
*/
  getClientes(): Observable<Cliente[]> {
    //return of (CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
  getClientesPaginado(pagina: number): Observable<any> {
    //return of (CLIENTES);
    return this.http.get(this.urlEndPoint + '/page/' + pagina).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })
    )
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  subirfoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("file", archivo);
    formData.append("id", id);
    /*
        let httpHeaders = new HttpHeaders();
        let token = this.auth.token;
        if(token != null){
          httpHeaders =   httpHeaders.append('Authorization','Bearer ' + token);
        }
    */
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
    });
    return this.http.request(req);
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }
}
