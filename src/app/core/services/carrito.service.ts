import { Injectable, WritableSignal, signal } from '@angular/core';
import { Carrito, ItemCarrito } from '../interfaces/carrito';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() {
    const cart = localStorage.getItem('cart');
    if(cart){
      this.carrito.set( JSON.parse(cart) );
    }
   }

  carrito: WritableSignal<Carrito> = signal({
    id: 0,
    items: []
  });

  agregarACarrito(producto: Producto, cant?: number) {
    if (this.carrito().id == 0) {
      this.carrito.set({ id: 1, items: [] });
    }
    let found = false;
    this.carrito().items.forEach((item) => {
      if (item.producto.idProducto == producto.idProducto) {
        if (cant) {
          item.cantidad = cant;
          item.importe = cant * item.producto.precio.precio;
        } else {
          item.cantidad += 1;
          item.importe = item.cantidad * item.producto.precio.precio;
        }
        found = true;
      }
    });
    if (!found) {
      const item: ItemCarrito = {
        producto: producto,
        cantidad: cant ? cant : 1,
        importe: cant ? cant * producto.precio.precio : producto.precio.precio
      };
      this.carrito().items.push(item);
    }
    this.actualizarLS();
    
  }

  eliminarDeCarrito(producto: Producto, cant?: number) {

    this.carrito().items.forEach((item) => {
      if (item.producto.idProducto == producto.idProducto) {
        if (cant != undefined && cant >= 0) {
          item.cantidad = cant;
          item.importe = cant * item.producto.precio.precio;
        } else {
          item.cantidad -= 1;
          item.importe = item.cantidad * item.producto.precio.precio;
        }
        if (item.cantidad <= 0) {
          this.carrito().items.splice(this.carrito().items.indexOf(item), 1);
        }
        return;
      }
    });
    this.actualizarLS()
  }

  getItems() {
    return this.carrito().items;
  }

  getImporte(){
    let importe = 0;
    this.carrito().items.forEach( (item) => {
      importe += item.importe;
    } );
    return importe;
  }

  clear(){
    this.carrito.set( {id:0, items:[]} );
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
