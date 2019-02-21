import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador:any;
  constructor(private clientesService: ClienteService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let pagina:number = +params.get('page');
      if(!pagina){
        pagina=0;
      }
      this.clientesService.getClientesPaginado(pagina).subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    })
  }

  delete (cliente: Cliente): void{
    Swal({
      title: 'Esta seguro?',
      text: `Esta seguro que desea eliminar a ${cliente.nombre} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

          this.clientesService.delete(cliente.id).subscribe(
            response => {

                this.clientes = this.clientes.filter(cli => cli !== cliente)

              Swal(
                'Eliminado!',
                'Cliente eliminado',
                'success'
                  )
            }
          )


}
})
  }

}
