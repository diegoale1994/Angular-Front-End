import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo: string = "Por favor Sign In!";
  usuario: Usuario;
  constructor(private auth: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      Swal('Login', `Hola ${this.auth.usuario.username} ya esta autenticado`, 'info');
      this.router.navigate(['/clientes'])
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal('Error Login', 'usuario o contraseña vacia', 'error');
      return;
    }
    this.auth.login(this.usuario).subscribe(response => {
      console.log(response);
      this.auth.guardarusuario(response.access_token);
      this.auth.guardarToken(response.access_token);
      let usuario = this.auth.usuario;
      this.router.navigate(['/clientes']);
      Swal('Login', `Hola ${usuario.username} has iniciado sesion correctamente !`, 'success');
    },
      e => {
        if (e.status == 400) {
          Swal('Error de Acceso', 'Usuario o clave incorrectas !', 'error');
        }
      })
  }

}
