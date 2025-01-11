import { Injectable, OnInit, WritableSignal, signal } from '@angular/core';
import { Moneda } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class MonedaService{

  moneda: WritableSignal<Moneda | undefined> = signal(undefined);
  monedas: Moneda[] = [];

  constructor() { 
    this.getMonedas().then( (monedas) => {
      this.monedas = monedas
      if( this.moneda() == undefined ){
        this.moneda.set(this.monedas[0]);
      }
    } );
  }



  updateMoneda(moneda: Moneda) {
    if (moneda.idMoneda != this.moneda()?.idMoneda){
      this.moneda.set(moneda);
    }
  }

  getTazaCambio(idMoneda: number = 2) {
    const monedas = this.getMonedas();
    for (let i = 0; i < this.monedas.length; i++) {
      const moneda = this.monedas[i];
      if (moneda.idMoneda == idMoneda) {
        return moneda.tazaCambio;
      }
    }
    return undefined;
  }

  async getMoneda(idMoneda: number) {
    return this.getMonedas().then(monedas => {
      return monedas.find(moneda => moneda.idMoneda == idMoneda)
    })
  }

  async getMonedas(): Promise<Moneda[]> {
    if (this.monedas.length == 0){
      const url = new URL('./data/monedas.json', import.meta.url);
      const res = await fetch(url);
  
      this.monedas = await res.json();
    }

    return this.monedas;
  }
}
