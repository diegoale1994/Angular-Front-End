import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})
export class HeaderComponent {
  tittle = "APP Angular";

  constructor(public auth: AuthService, private router : Router) { }

  logout(): void {
    Swal('Logout', `${this.auth.usuario.nombre} has cerrado session !`, 'success');
    this.auth.cerrarSession();
    this.router.navigate(['/login']);
  }
}
