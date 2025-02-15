import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Carrito, ItemCarrito } from '../interfaces/carrito';
import { Moneda, Producto } from '../interfaces/producto';
import { ProductosService } from './productos.service';
import { MonedaService } from './moneda.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() {
    if (typeof window !== 'undefined') {

      const cart = localStorage.getItem('cart');
      if (cart) {
        this.carrito.set(JSON.parse(cart));
        if (this.carrito().moneda == undefined) this.clear();
        else {
          this.monedasService.moneda.set(this.carrito().moneda);
          this.items = this.carrito().items.length;
        }
      }
      // else {
      //   this.getMoneda(1).then(moneda => {
      //     this.monedasService.moneda.set(moneda);
      //     this.carrito().moneda = moneda;
      //   });
      // }
    }
  }

  moneda = computed(() => {
    // this.actualizarLS(this.monedasService.moneda());
    const moneda = this.monedasService.moneda();
    this.carrito().moneda = moneda;
    this.actualizarImporte(moneda!);
    return moneda;
  });

  tieneDescuento = computed(() => {
    const moneda = this.moneda();
    if (moneda!.idMoneda == 1 ) {
      return true;
    }
    return false;
  })



  productsService = inject(ProductosService);
  monedasService = inject(MonedaService);



  carrito: WritableSignal<Carrito> = signal({
    id: 0,
    moneda: undefined,
    items: []
  });

  items = 0;



  actualizarImporte(moneda: Moneda) {
    this.carrito().items.forEach(item => {
      item.importe = Math.round(item.cantidad * this.productsService.getPrecio(true, item.producto) * 10) / 10;
    });
    this.actualizarLS();
  }

  agregarACarrito(producto: Producto, cant?: number) {
    if (this.carrito().id == 0) {
      this.carrito.set({ id: 1, moneda: this.moneda(), items: [] });
    }
    let found = false;

    const precio = this.productsService.getPrecio(true, producto);


    this.carrito().items.forEach((item) => {
      if (item.producto.idProducto == producto.idProducto) {
        if (cant) {
          item.cantidad = cant;
          item.importe = Math.round((cant * precio) * 10) / 10;
        } else {
          item.cantidad += 1;
          item.importe = Math.round((item.cantidad * precio) * 10) / 10;
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

    const precio = this.productsService.getPrecio(true, producto);

    this.carrito().items.forEach((item) => {
      if (item.producto.idProducto == producto.idProducto) {
        if (cant != undefined && cant >= 0) {
          item.cantidad = cant;
          item.importe = Math.round((cant * precio) * 10) / 10;
        } else {
          item.cantidad -= 1;
          item.importe = Math.round((item.cantidad * precio) * 10) / 10;
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



  getImporte(descuento: boolean) {
    if (descuento) {
      let importe = 0;
      this.carrito().items.forEach((item) => {
        importe += item.importe;
      });
      return Math.ceil(importe);
    } else {
      let importe = 0;
      this.carrito().items.forEach((item) => {
        importe += (this.productsService.getPrecio(false, item.producto) * item.cantidad);
      });
      return Math.ceil(importe);
    }
  }

  clear() {
    this.carrito.set({ id: 0, moneda: this.moneda(), items: [] });
    this.actualizarLS();
  }


  isEmpty() {
    return this.carrito().items.length == 0;
  }

  actualizarLS() {
    this.items = this.carrito().items.length;
    if (this.isEmpty()) {
      localStorage.removeItem('cart')
    } else {
      localStorage.setItem('cart', JSON.stringify(this.carrito()));
    }
  }






}
