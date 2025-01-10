import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { LoadingComponent } from '../../core/components/loading/loading.component';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { Departamento } from '../../core/interfaces/departamento';
import { DepartamentoComponent } from "../departamento/departamento.component";
import { TarjetaDepartamentoComponent } from '../../core/components/tarjeta-departamento/tarjeta-departamento.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { Tienda } from '../../core/interfaces/tienda';
import { ProductoShowcaseComponent } from '../../core/components/producto-showcase/producto-showcase.component';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ProductoShowcaseComponent, LoadingComponent, DepartamentoComponent, RouterModule, TarjetaDepartamentoComponent, CommonModule]
})

export class HomeComponent implements OnInit {

  departamentosService = inject(DepartamentosService);
  departamentos: WritableSignal<Departamento[]> = signal([]);
  productosNuevos: WritableSignal<Producto[]> = signal([]);

  seo = inject(SeoService);
  productosService = inject(ProductosService);


  ngOnInit(): void {
    this.departamentosService.getAll().then(res => this.departamentos.set(res));
    this.seo.title.setTitle(`Página INICIO | M&L SOLUCIONES`);
    this.seo.meta.updateTag({ name: "description", content: `Página de inicio en M&L SOLUCIONES` });
    this.seo.setCanonicalUrl(`home`);
    this.seo.setIndexFollow(true);

    this.productosService.getProductosNuevos().then( (productos) => {
      this.productosNuevos.set(productos);
      console.log(this.productosNuevos());
    } )
  
  }


  isExpanded = false;

  tiendas: Tienda[] = [
    {
      idTienda: 1,
      nombre: "Amanecer",
      imageName: "tienda-Amanecer.jpg",
      direccion: "Calle Martí #128, Pinar del Río",
      coordenadas: "22.4144804, -83.6923232" // Ejemplo de coordenadas (Nueva York)
    },
    {
      idTienda: 2,
      nombre: "La Quincallera",
      imageName: "tiendas-Amanecer.jpg",
      direccion: "Calle Martí #123, Pinar del Río",
      coordenadas: "22.4165366, -83.6991112" // Ejemplo de coordenadas (Chicago)
    },
    {
      idTienda: 3,
      nombre: "La Mariposa",
      imageName: "tienda-Mariposa.png",
      direccion: "Calle Rafael Morales #14 E/ Calle Martí y Calle Máximo Gómez",
      coordenadas: "22.4157534, -83.6985201" // Ejemplo de coordenadas (Los Ángeles)
    }
  ];

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  abrirEnMaps(coordenadas: string) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${coordenadas}`, '_blank');
  }




}
