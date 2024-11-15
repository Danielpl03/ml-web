import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Departamento } from '../../core/interfaces/departamento';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { Categoria } from '../../core/interfaces/categoria';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/producto';
import { TarjetaCategoriaComponent } from "../../core/components/tarjeta-categoria/tarjeta-categoria.component";
import { ProductoComponent } from "../producto/producto.component";
import { TarjetaProductoComponent } from "../../core/components/tarjeta-producto/tarjeta-producto.component";
import { LoadingComponent } from '../../core/components/loading/loading.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [LoadingComponent, CommonModule, RouterModule, TarjetaCategoriaComponent, ProductoComponent, TarjetaProductoComponent],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.css'
})
export class DepartamentoComponent implements OnInit {

  seo = inject(SeoService);




  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      if (params['id']) {
        this.departamentosService.getById(parseInt(params['id'])).then(dpto => {
          this.departamento = dpto;
          if (this.departamento) {
            this.seo.title.setTitle(`${this.departamento.nombre} | M&L SOLUCIONES`);
            this.seo.meta.updateTag({ name: "description", content: `${this.departamento.nombre} en M&L SOLUCIONES` });
            this.seo.setCanonicalUrl(`www.ml-soluciones.vercel.app/departamentos/${this.departamento.idDepartamento}`);
            this.seo.setIndexFollow(true);
            this.cargarDatos().then(() => {
              this.loading.update(value => false);
            });
          } else {
            this.router.navigate(['departamentos']);
          }
        });
      }
    })



  }

  constructor(private router: Router) {
  }

  departamento?: Departamento
  ac = inject(ActivatedRoute)
  categorias: WritableSignal<Categoria[] | undefined> = signal(undefined);
  productos: WritableSignal<Producto[] | undefined> = signal(undefined);
  categoriasService = inject(CategoriasService);
  departamentosService = inject(DepartamentosService);
  productosService = inject(ProductosService);
  loading = signal(true);



  async cargarDatos() {
    await this.getCategoriasByDepartamento(this.departamento!.idDepartamento);
    await this.getProductosByDepartamento(this.departamento!.idDepartamento);
  }


  async getCategoriasByDepartamento(id: number) {
    this.categorias.set(await this.categoriasService.getByDepartamento(id));
  }

  async getProductosByDepartamento(id: number) {
    this.productos.set(await this.productosService.getByDepartamento(id));
  }

}
