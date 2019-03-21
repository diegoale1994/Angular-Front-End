import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from './models/producto';
import { ItemFactura } from './models/item-factura';
import { map, flatMap } from 'rxjs/operators';
import { FacturaService } from './services/factura.service';
import {MatAutocompleteSelectedEvent} from '@angular/Material';
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {
  titulo: string = "Nueva Factura";
  factura: Factura = new Factura;
  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;
  constructor(private activatedRoute: ActivatedRoute, private clienteService: ClienteService, private facturaService: FacturaService) { }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = params.get('clienteId');
      this.getCliente(+clienteId);
    })

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
      );
  }
  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarProductos(filterValue);
  }
  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  getCliente(id: number) {
    this.clienteService.getCliente(id).subscribe(cliente => {
      this.factura.cliente = cliente;
    })
  }

seleccionarProducto(event: MatAutocompleteSelectedEvent):void{
  let producto = event.option.value as Producto;
  let nuevoItem = new ItemFactura();
  nuevoItem.producto = producto;
  this.factura.items.push(nuevoItem);
  this.autocompleteControl.setValue('');
  event.option.focus();
  event.option.deselect();
  console.log(this.factura);
}

}
