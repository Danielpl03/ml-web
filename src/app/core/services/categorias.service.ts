import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }

  async getAll(): Promise<Categoria[]>{
    const url = new URL('./data/categorias.json', import.meta.url);
    const res = await fetch(url);

    const categorias = await res.json();
    return categorias;
  }

  async getById(idCategoria: number): Promise<Categoria| undefined>{
    const url = new URL('./data/categorias.json', import.meta.url);
    const res = await fetch(url);

    const categorias:Categoria[] = await res.json();
    const categoriaFiltrada = categorias.filter(cat => cat.idCategoria === idCategoria);
    if (categoriaFiltrada.length === 1){
      return categoriaFiltrada[0];
    }
    return undefined;
  }

  async getByDepartamento(idDepartamento: number): Promise<Categoria[]>{
    const url = new URL('./data/categorias.json', import.meta.url);
    const res = await fetch(url);

    const categorias:Categoria[] = await res.json();
    const categoriaFiltrada = categorias.filter(cat => cat.idDepartamento === idDepartamento);
    if (categoriaFiltrada){
      return categoriaFiltrada;
    }
    return [];
  }
}
