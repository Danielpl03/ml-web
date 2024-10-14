import { Component, OnInit, inject } from '@angular/core';
import { Busqueda } from '../../core/interfaces/busqueda';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Departamento } from '../../core/interfaces/departamento';
import { DepartamentosService } from '../../core/services/departamentos.service';
import { Categoria } from '../../core/interfaces/categoria';
import { Producto } from '../../core/interfaces/producto';
import { CategoriasService } from '../../core/services/categorias.service';
import { ProductosService } from '../../core/services/productos.service';
import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { TarjetaDepartamentoComponent } from '../../core/components/tarjeta-departamento/tarjeta-departamento.component';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [RouterModule ,TarjetaCategoriaComponent, TarjetaDepartamentoComponent, TarjetaProductoComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {

  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      if (params['texto']) {
        const text: string = params['texto'];
        if (text.trim().length > 0) {
          this.busqueda.texto = text.trim();
          this.buscar(this.busqueda)
        }
      } else {
        this.router.navigate(['departamentos'])
      }
    })
  }

  constructor(private router: Router) { }


  ac = inject(ActivatedRoute);
  busqueda: Busqueda = {
    texto: ""
  }
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  categoriasService = inject(CategoriasService);
  departamentosService = inject(DepartamentosService);
  productosService = inject(ProductosService);
  departamentos: Departamento[] = [];

  buscar(busqueda: Busqueda) {
    this.productos = []
    this.categorias = []
    this.departamentos = []
    this.categoriasService.getAll().then(categorias => {
      categorias.forEach(categoria => {
        if (categoria.nombre.toLowerCase().includes(busqueda.texto.toLowerCase())) {
          this.categorias.push(categoria);
        }
      })
      const ids = this.categorias.map(cat => cat.idCategoria)
      this.productosService.getByBusqueda(busqueda).then(productos => {
        productos.forEach(producto => {
          if (!ids.includes(producto.idCategoria ? producto.idCategoria : -4000)) {
            this.productos.push(producto);
          }
        })
      })
    })
    
    
    this.departamentosService.getAll().then(dptos => {
      dptos.forEach(dpto => {
        if (dpto.nombre.toLowerCase().includes(busqueda.texto.toLowerCase())) {
          this.departamentos.push(dpto);
        }
      })
    })

  }

  sinResultados(): boolean {
    if (this.departamentos.length > 0)return false;
    if (this.categorias.length > 0)return false;
    if (this.productos.length > 0)return false;
    return true
  }

}
