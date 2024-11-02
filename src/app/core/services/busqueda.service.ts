import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { BusqueResult, Busqueda } from '../interfaces/busqueda';
import { Categoria } from '../interfaces/categoria';
import { Producto } from '../interfaces/producto';
import { CategoriasService } from './categorias.service';
import { DepartamentosService } from './departamentos.service';
import { ProductosService } from './productos.service';
import { Departamento } from '../interfaces/departamento';
import { B } from '@angular/cdk/keycodes';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  categorias: Categoria[] = [];

  productos: Producto[] = [];
  categoriasService = inject(CategoriasService);
  departamentosService = inject(DepartamentosService);
  productosService = inject(ProductosService);
  departamentos: Departamento[] = [];



  constructor() { }

  async buscar(busqueda: Busqueda) {
    await this.getResultados(busqueda);

    const busquedaResult: BusqueResult = {
      departamentos: this.departamentos,
      categorias: this.categorias,
      productos: this.productos
    }

    return busquedaResult;

  }

  async getResultados(busqueda: Busqueda) {
    this.productos = []
    this.categorias = []
    this.departamentos = []
    const categoriasFound = await this.categoriasService.getAll();
    categoriasFound.forEach(categoria => {
      if (categoria.nombre.toLowerCase().includes(busqueda.texto.toLowerCase())) {
        this.categorias.push(categoria);
      }
    })
    const ids = this.categorias.map(cat => cat.idCategoria)
    const productosFound = await this.productosService.getByBusqueda(busqueda)
    productosFound.forEach(producto => {
      if (!ids.includes(producto.idCategoria ? producto.idCategoria : -4000)) {
        this.productos.push(producto);
      }
    })
    const departamentosFound = await this.departamentosService.getAll()
    departamentosFound.forEach(dpto => {
      if (dpto.nombre.toLowerCase().includes(busqueda.texto.toLowerCase())) {
        this.departamentos.push(dpto);
      }
    });
  }

}


