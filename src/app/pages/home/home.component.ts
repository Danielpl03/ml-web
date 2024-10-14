import { Component, OnInit, inject } from '@angular/core';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { Departamento } from '../../core/interfaces/departamento';
import { DepartamentoComponent } from "../departamento/departamento.component";
import { TarjetaDepartamentoComponent } from '../../core/components/tarjeta-departamento/tarjeta-departamento.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [DepartamentoComponent, RouterModule  ,TarjetaDepartamentoComponent, CommonModule]
})

export class HomeComponent implements OnInit{

    departamentosService = inject(DepartamentosService);
    departamentos: Departamento[] = [];

  ngOnInit(): void {
    this.departamentosService.getAll().then(res => this.departamentos = res);
  }
  
 


}
