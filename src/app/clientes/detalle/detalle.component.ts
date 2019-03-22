import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import Swal from 'sweetalert2';
import { Factura } from '../../facturas/models/factura';
import { FacturaService } from '../../facturas/services/factura.service';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from '../../usuarios/auth.service';
@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  progreso: number = 0;
  private fotoSeleccionada: File;
  constructor(private facturaService:FacturaService, private clienteService: ClienteService,
    public modalservice: ModalService, public auth: AuthService) { }

  ngOnInit() {

  }

  eliminar(factura:Factura):void{
    Swal({
      title: 'Esta seguro?',
      text: `Esta seguro que desea eliminar la factura?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.facturaService.delete(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura)
            Swal(
              'Eliminado!',
              'Factura eliminada',
              'success'
            )
          }
        )


      }
    })
  }

  seleccionaFoto(event) {
    this.progreso = 0;
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal('Error', `Debe seleccionar un archivo de tipo imagen`, 'error')
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal('Error', `No se ha seleccionado ninguna imagen`, 'error');
    } else {
      this.clienteService.subirfoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded) / (event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalservice.notificarUpload.emit(this.cliente);
            Swal('La foto se ha subido Correctamente', response.mensaje, 'success');
          }

        })
    }
  }
  cerrarModal() {
    this.modalservice.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
