import { Injectable, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Moneda, Producto } from '../interfaces/producto';
import { Busqueda } from '../interfaces/busqueda';

import { CategoriasService } from './categorias.service';
import { DepartamentosService } from './departamentos.service';


@Injectable({
  providedIn: 'root'
})
export class ProductosService{

  constructor() { }



  localidades: number[] = [102, 103, 105];

  categoriasService = inject(CategoriasService);
  departamentosService = inject(DepartamentosService)


  async getAll(): Promise<Producto[]> {
    const url = new URL('./data/productos.json', import.meta.url);
    const res = await fetch(url);
    const productos: Producto[] = await res.json();

    const productosFiltrados = productos.filter(producto => {
      if (producto.stocks) {
        for (let index = 0; index < this.localidades.length; index++) {
          const element = producto.stocks[this.localidades[index]];
          if (element > 0) return true;
        }
      }
      return false;
    })

    return productosFiltrados;
  }

  async getByDepartamento(idDepartamento: number): Promise<Producto[] | undefined> {

    return this.departamentosService.getById(idDepartamento).then(dpto => {
      if (dpto) {
        if (dpto.productos) {
          const productos: Producto[] = dpto.productos.filter(producto => {
            if (producto.stocks) {
              for (let index = 0; index < this.localidades.length; index++) {
                const element = producto.stocks[this.localidades[index]];
                if (element > 0) return true;
              }
            }
            return false;
          });
          if (productos.length > 0) {
            return productos;
          }
        }
      }
      return undefined
    })

  }

  async getByCategoria(idCategoria: number): Promise<Producto[] | undefined> {
    return this.categoriasService.getById(idCategoria).then(cat => {
      if (cat) {
        if (cat.productos) {
          const productos: Producto[] = cat.productos.filter(producto => {
            if (producto.stocks) {
              for (let index = 0; index < this.localidades.length; index++) {
                const element = producto.stocks[this.localidades[index]];
                if (element > 0) return true;
              }
            }
            return false;
          });
          if (productos.length > 0) {
            return productos;
          }
        }
      }
      return undefined;
    })
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
