import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Busqueda } from '../interfaces/busqueda';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }
  localidades: number[] = [102, 103, 105];


  async getAll(): Promise<Producto[]> {
    const url = new URL('./data/productos.json', import.meta.url);
    const res = await fetch(url);
    const productos:Producto[] = await res.json();
    
    const productosFiltrados = productos.filter(producto => {
      if (producto.stocks){
        for (let index = 0; index < this.localidades.length; index++) {
          const element = producto.stocks[this.localidades[index]];
          if (element > 0) return true;
        }
      }
      return false;
    })

    return productosFiltrados;
  }

  async getByDepartamento(idDepartamento: number): Promise<Producto[]> {
    
    const productos: Producto[] = await this.getAll();

    const productosFiltrados = productos.filter(producto => producto.idDepartamento === idDepartamento);

    return productosFiltrados;
  }

  async getByCategoria(idCategoria: number): Promise<Producto[]> {
    const productos: Producto[] = await this.getAll();

    const productosFiltrados = productos.filter(producto => producto.idCategoria && producto.idCategoria === idCategoria);

    return productosFiltrados;
  }

  async getByBusqueda(busqueda: Busqueda): Promise<Producto[]> {
    const productos: Producto[] = await this.getAll();

    const texto = busqueda.texto.toLowerCase();
    const productosFiltrados = productos.filter(producto => {
      if (producto.codigo && producto.codigo.toLowerCase().includes(texto)) return true;
      if (producto.descripcion.toLowerCase().includes(texto)) return true;
      // if ( parseInt(texto) === producto.precio )return true;
      return false;
    })
    return productosFiltrados;
  }

}
