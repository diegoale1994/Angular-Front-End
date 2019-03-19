import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from './services/factura.service';
import { Factura } from './models/factura';
@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent implements OnInit {
  factura:Factura;
  titulo:string = 'Factura'
  constructor(private activatedRoute:ActivatedRoute, private facturaService: FacturaService) { }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.facturaService.getFactura(id).subscribe((factura:Factura) => {
        this.factura = factura;
        console.log(this.factura);
      })
    })
  }
}
