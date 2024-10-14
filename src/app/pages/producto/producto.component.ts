import { Component, inject } from '@angular/core';
import { Producto } from '../../core/interfaces/producto';
import { ProductosService } from '../../core/services/productos.service';
import { Departamento } from '../../core/interfaces/departamento';
import { Categoria } from '../../core/interfaces/categoria';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  productos:Producto[] = [];

  productosService = inject(ProductosService);

  async getProductos(){
    this.productos = await this.productosService.getAll();
  }



  
}
