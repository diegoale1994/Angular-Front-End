import { Component, OnInit } from '@angular/core';
import {Cliente} from '../cliente';
import { ClienteService } from '../cliente.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  cliente:Cliente;
  titulo:string = "Detalle del cliente";
   progreso:number= 0;
  private fotoSeleccionada:File;
  constructor(private clienteService: ClienteService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params =>{
      let id:number = +params.get("id");
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente =>{
          this.cliente = cliente;

        })
      }
    })
  }

  seleccionaFoto(event){
    this.progreso=0;
this.fotoSeleccionada = event.target.files[0];
console.log(this.fotoSeleccionada);
if(this.fotoSeleccionada.type.indexOf('image') < 0){
Swal('Error',`Debe seleccionar un archivo de tipo imagen`,'error')
this.fotoSeleccionada = null;
}
  }

  subirFoto(){
if(!this.fotoSeleccionada){
Swal('Error',`No se ha seleccionado ninguna imagen`,'error');
}else{
  this.clienteService.subirfoto(this.fotoSeleccionada,this.cliente.id)
  .subscribe(event => {
  if(event.type === HttpEventType.UploadProgress){
    this.progreso = Math.round((event.loaded)/(event.total)*100);
  }else if (event.type === HttpEventType.Response){
    let response:any = event.body;
    this.cliente = response.cliente as Cliente;
    Swal('La foto se ha subido Correctamente',response.mensaje,'success');
  }

  })
}
}



}
