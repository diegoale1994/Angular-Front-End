import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private route: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      if (this.isTokenExpired) {
        this.auth.cerrarSession();
        this.route.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }

  isTokenExpired(): boolean {
    console.log("entre");
    let token: string = this.auth.token;
    console.log(token);
    let payload = this.auth.obtenerDatosToken(token);
      console.log(payload.exp);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}
