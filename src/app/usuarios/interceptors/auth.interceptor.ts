import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router:Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {



return next.handle(req).pipe(

  catchError(e => {
    if (e.status == 401) {

      if(this.auth.isAuthenticated()){
        this.auth.cerrarSession();
      }

      this.router.navigate(['/login'])
    }

    if (e.status == 403) {
      Swal('Acceso denegado','Hola '+this.auth.usuario.nombre+" no tienes los suficientes permisos para acceder a este recurso",'warning');
      this.router.navigate(['/clientes'])
    }
    return throwError(e);
  })

);
}
}
