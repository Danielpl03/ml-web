import { Injectable } from '@angular/core';
import { Departamento } from '../interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor() { }

  async getAll(): Promise<Departamento[]>{
    const url = new URL('./data/departamentos.json', import.meta.url);
    const res = await fetch(url);

    const departamentos = await res.json();
    return departamentos;
  }

  async getById(idDepartamento: number): Promise<Departamento | undefined>{
    const url = new URL('./data/departamentos.json', import.meta.url);
    const res = await fetch(url);

    const departamentos:Departamento[] = await res.json();
    const departamentoFiltrado = departamentos.filter(cat => cat.idDepartamento === idDepartamento);
    if (departamentoFiltrado.length === 1){
      return departamentoFiltrado[0];
    }
    return undefined
  }
}
