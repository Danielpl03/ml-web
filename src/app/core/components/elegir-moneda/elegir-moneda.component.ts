import { Component, EventEmitter, Input, OnInit, Output, WritableSignal, inject, signal } from '@angular/core';
import { Moneda } from '../../interfaces/producto';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-elegir-moneda',
  standalone: true,
  imports: [],
  templateUrl: './elegir-moneda.component.html',
  styleUrl: './elegir-moneda.component.css'
})
export class ElegirMonedaComponent implements OnInit{

  ngOnInit(): void {
    console.log(this.monedaI);
    this.moneda.set(this.monedaI);
    this.productsService.getMonedas().then( monedas => {
      this.monedas = monedas;
      if (this.moneda() == undefined){
        this.moneda.set(monedas[0]);
      }
    } )
  }

  monedas: Moneda[] = [];
  productsService = inject(ProductosService);
  moneda: WritableSignal<Moneda | undefined> = signal(undefined);

  @Input({required:true}) monedaI!: Moneda | undefined; 
  @Output() idMoneda = new EventEmitter<Moneda>();

  actualizarPrecios(idMoneda: number = 1){

  }

  cambiarMoneda(){
    if(this.moneda()?.idMoneda == 1){
      this.moneda.set(this.monedas[1]);
    }else{
      this.moneda.set(this.monedas[0]);
    }
    this.idMoneda.emit( this.moneda() );
  }

  

}
