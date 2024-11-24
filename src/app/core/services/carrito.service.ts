import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Carrito, ItemCarrito } from '../interfaces/carrito';
import { Moneda, Producto } from '../interfaces/producto';
import { ProductosService } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService{

  constructor() {
    const cart = localStorage.getItem('cart');
    if(cart){
      this.carrito.set( JSON.parse(cart) );
      if(this.carrito().moneda == undefined)this.clear();
      this.moneda.set(this.carrito().moneda)
    }else{
      this.productsService.getMoneda(1).then( moneda => {
        console.log(moneda);
        this.moneda.set(moneda);
        this.carrito().moneda = moneda;
      });
    }
   }


   productsService = inject(ProductosService);
   moneda:WritableSignal<Moneda | undefined> = signal(undefined);

  carrito: WritableSignal<Carrito> = signal({
    id: 0,
    moneda: undefined,
    items: []
  });

  actualizarImporte(moneda: Moneda){
    this.moneda.set(moneda);
    this.carrito().items.forEach( item => {
      item.importe = Math.round(item.cantidad * this.getPrecio(item.producto, moneda) *10) /10 ;
    });
    this.carrito().moneda = moneda;
    this.actualizarLS();
  }

   getPrecio(producto: Producto, moneda: Moneda|undefined){
    if (moneda == undefined) return 0;
    if(moneda.idMoneda == 1){
      return producto.precio.precio;
    }else{
      let precio = 0;
      for (let i = 0; i < producto.precios.length; i++) {
        const precioP = producto.precios[i];
        if  (precioP.idMoneda == moneda.idMoneda){
          precio = precioP.precio;
        }
      }
      if  (precio == 0){
        precio = Math.round( (producto.precio.precio / moneda.tazaCambio) * 10 ) / 10 ;
      }
      return precio;

    }
  }

  agregarACarrito(producto: Producto, cant?: number) {
    if (this.carrito().id == 0) {
      this.carrito.set({ id: 1, moneda: this.moneda(), items: [] });
    }
    let found = false;
    
    const precio = this.getPrecio(producto, this.moneda())


    this.carrito().items.forEach((item) => {
      if (item.producto.idProducto == producto.idProducto) {
        if (cant) {
          item.cantidad = cant;
          item.importe = Math.round( (cant * precio) * 10 ) / 10 ;
        } else {
          item.cantidad += 1;
          item.importe = Math.round( (item.cantidad * precio) * 10 ) / 10 ;
        }
        found = true;
      }
    });
    if (!found) {
      const item: ItemCarrito = {
        producto: producto,
        cantidad: cant ? cant : 1,
        importe: cant ? cant * precio : precio
      };
      this.carrito().items.push(item);
    }
    this.actualizarLS();
    
  }

  eliminarDeCarrito(producto: Producto, cant?: number) {

    const precio = this.getPrecio(producto, this.moneda())

    this.carrito().items.forEach((item) => {
      if (item.producto.idProducto == producto.idProducto) {
        if (cant != undefined && cant >= 0) {
          item.cantidad = cant;
          item.importe = Math.round( (cant * precio) * 10 ) / 10 ;
        } else {
          item.cantidad -= 1;
          item.importe = Math.round( (item.cantidad * precio) * 10 ) / 10 ;
        }
        if (item.cantidad <= 0) {
          this.carrito().items.splice(this.carrito().items.indexOf(item), 1);
        }
        return;
      }
    });
    this.actualizarLS();
  }

  getItems() {
    return this.carrito().items;
  }

  getImporte(){
    let importe = 0;
    this.carrito().items.forEach( (item) => {
      importe += item.importe;
    });
    return Math.ceil(importe);
  }

  clear(){
    this.carrito.set( {id:0, moneda: this.moneda(), items:[]} );
    this.actualizarLS();
  }


  isEmpty() {
    return this.carrito().items.length == 0;
  }

  actualizarLS() {
    if (this.isEmpty()) {
      localStorage.removeItem('cart')
    } else {
      localStorage.setItem('cart', JSON.stringify(this.carrito()));
    }
  }


}
