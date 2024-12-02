import { Component, EventEmitter, Input, OnInit, Output, computed, inject } from '@angular/core';
import { Moneda } from '../../interfaces/producto';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-elegir-moneda',
  standalone: true,
  imports: [],
  templateUrl: './elegir-moneda.component.html',
  styleUrl: './elegir-moneda.component.css'
})
export class ElegirMonedaComponent implements OnInit{

  ngOnInit(): void {
    this.carritoService.getMonedas().then( monedas => {
      this.monedas = monedas;
    });
  }

  monedas: Moneda[] = [];
  carritoService = inject(CarritoService);
  moneda = computed( () => this.carritoService.moneda() );

  @Output() idMoneda = new EventEmitter<Moneda>();

  actualizarPrecios(idMoneda: number = 1){

  }

  cambiarMoneda(){
    if(this.moneda()?.idMoneda == 1){
      this.carritoService.moneda.set(this.monedas[1]);
    }else{
      this.carritoService.moneda.set(this.monedas[0]);
    }
    this.idMoneda.emit( this.moneda() );
  }

  

}
