import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginador:any;
  desde:number;
  hasta:number;
  paginas:number[];
  constructor() {
  }

  ngOnInit() {
  this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice) => indice+1);

  }
  ngOnChanges(){

/*    this.desde = Math.min(Math.max(1,this.paginador.number-4), this.paginador.totalPages-5);
    this.hasta = Math.max(Math.min(this.paginador.number.totalPages, this.paginador.number+4),6);
console.log("a");
    if(this.paginador.totalPages > 5){
      console.log("a");
      this.paginas = new Array(this.hasta - this.desde + 1 ).fill(0).map((_valor,indice) => indice+this.desde);
    }else{
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice) => indice+1);
    }
    */
  }

}
