import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import {ClienteService} from './cliente.service'
import {Router, ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo: string = "Crear Cliente";

  constructor(private ClienteService: ClienteService,
    private router: Router,
  private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.ActivatedRoute.params.subscribe(params =>{
      let id = params['id']

      if (id) {
        this.ClienteService.getCliente(id).subscribe( (cliente)=> this.cliente = cliente)
      }

    })

  }

 create(): void {
    this.ClienteService.create(this.cliente)
    .subscribe(json => {
        this.router.navigate(['/clientes'])
        Swal('Nuevo Cliente', `Cliente ${json.cliente.nombre} creado con exito!`, 'success')
    }
  );
  }

  update():void{
    this.ClienteService.update(this.cliente)
    .subscribe(json =>{
        this.router.navigate(['/clientes'])
        Swal('Cliente Actuaizado',`Cliente ${json.cliente.nombre} Actualizado correctamente`,'success')
      }

    )
  }

}
