import { Injectable, inject } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { DepartamentosService } from './departamentos.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }

  departamentosService = inject(DepartamentosService);

  async getAll(): Promise<Categoria[]>{
    const categorias: Categoria[] = [];
    return this.departamentosService.getAll().then( dptos => {
      if(dptos){
        for (let departamento of dptos){
          if(departamento.categorias){
            departamento.categorias.forEach( categoria => {
              categorias.push(categoria);
            } )
          }
        }
      }
      return categorias;
    })

  }

  async getById(idCategoria: number): Promise<Categoria| undefined>{
    const url = new URL('./data/categorias.json', import.meta.url);
    const res = await fetch(url);

    const categorias:Categoria[] = await res.json();
    const categoriaFiltrada = categorias.filter(cat => cat.idCategoria === idCategoria);
    if (categoriaFiltrada.length == 1){
      return categoriaFiltrada[0];
    }
    return undefined;
  }

  async getByDepartamento(idDepartamento: number): Promise<Categoria[] | undefined>  {
    
    return this.departamentosService.getById(idDepartamento).then( departamento => {
      if (departamento){
        if(departamento.categorias){
          const categorias: Categoria[] = departamento.categorias;
          if (categorias.length>0){
            return categorias;
          }
        }
      }
      return undefined;
    } );


    // res.json().then( departamentos => {
    //   const departamentosF: Departamento[] = departamentos;
    //   const categorias:Categoria[] = departamentosF.
    // }  );

    // const categoriaFiltrada = categorias.filter(cat => cat.idDepartamento === idDepartamento);
    // if (categoriaFiltrada){
    //   return categoriaFiltrada;
    // }
    // return [];
  }
}
