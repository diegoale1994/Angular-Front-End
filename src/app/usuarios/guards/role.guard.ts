import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth:AuthService,
   private route:Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.auth.isAuthenticated()){
          this.route.navigate(['/login'])
        return false;
      }
      let role = next.data['role'] as string;
      console.log(role);
      if(this.auth.hasRole(role)){
        return true;
      }
      Swal('Acceso denegado','Hola '+this.auth.usuario.nombre+" no tienes los suficientes permisos para acceder a este recurso",'warning');
      this.route.navigate(['/clientes'])
    return false;
  }
}
