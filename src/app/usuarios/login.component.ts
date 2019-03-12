import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo: string = "Por favor Sign In!";
  usuario: Usuario;
  constructor(private auth:AuthService,private router:Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal('Error Login', 'usuario o contraseña vacia', 'error');
      return;
    }
    this.auth.login(this.usuario).subscribe(response=>{
      console.log(response);
      this.router.navigate(['/clientes']);
      Swal('Login', `Hola ${response.nombre} has iniciado sesion correctamente !`, 'success');
    })
  }

}
