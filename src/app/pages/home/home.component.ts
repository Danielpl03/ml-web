import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { LoadingComponent } from '../../core/components/loading/loading.component';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { Departamento } from '../../core/interfaces/departamento';
import { DepartamentoComponent } from "../departamento/departamento.component";
import { TarjetaDepartamentoComponent } from '../../core/components/tarjeta-departamento/tarjeta-departamento.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [LoadingComponent, DepartamentoComponent, RouterModule, TarjetaDepartamentoComponent, CommonModule]
})

export class HomeComponent implements OnInit {

  departamentosService = inject(DepartamentosService);
  departamentos: WritableSignal<Departamento[]> = signal([]);

  seo = inject(SeoService);


  ngOnInit(): void {
    this.departamentosService.getAll().then(res => this.departamentos.set(res));
    this.seo.title.setTitle(`Página Departamentos | M&L SOLUCIONES`);
    this.seo.meta.updateTag({ name: "description", content: `Departamentos en M&L SOLUCIONES` });
    this.seo.setCanonicalUrl(`www.ml-soluciones.vercel.app/departamentos`);
    this.seo.setIndexFollow(true);
  }






}
