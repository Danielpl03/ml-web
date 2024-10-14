import { Component, OnInit, inject } from '@angular/core';
import { Departamento } from '../../core/interfaces/departamento';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { Categoria } from '../../core/interfaces/categoria';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CategoriasService } from '../../core/services/categorias.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/producto';
import { TarjetaCategoriaComponent } from "../../core/components/tarjeta-categoria/tarjeta-categoria.component";
import { ProductoComponent } from "../producto/producto.component";
import { TarjetaProductoComponent } from "../../core/components/tarjeta-producto/tarjeta-producto.component";

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, TarjetaCategoriaComponent, ProductoComponent, TarjetaProductoComponent],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.css'
})
export class DepartamentoComponent implements OnInit{

  ngOnInit(): void {
    this.ac.params.subscribe( params => {
      if (params['id']){
        this.departamentosService.getById(parseInt (params['id'])).then(dpto => {
          this.departamento = dpto;
          if (this.departamento){
            this.getCategoriasByDepartamento(this.departamento.idDepartamento);
            this.getProductosByDepartamento(this.departamento.idDepartamento);
          }else{
            this.router.navigate(['departamentos']);
          }
        });
      }
    })
  }

  constructor( private router: Router){
  }

  departamento?: Departamento
  ac = inject(ActivatedRoute)
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  categoriasService = inject(CategoriasService);
  departamentosService = inject(DepartamentosService);
  productosService = inject(ProductosService);

  getCantItems(categoria: Categoria) : number{
    return this.productos.filter(p => p.idCategoria === categoria.idCategoria).length
  }


  async getCategoriasByDepartamento(id: number){
    this.categorias = await this.categoriasService.getByDepartamento(id);
  }

  async getProductosByDepartamento(id: number){
    this.productos = await this.productosService.getByDepartamento(id);
  }

}
