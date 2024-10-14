import { Component, Input, OnInit, inject } from '@angular/core';
import { Categoria } from '../../interfaces/categoria';
import { CommonModule } from '@angular/common';
import { TarjetaProductoComponent } from "../tarjeta-producto/tarjeta-producto.component";
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-tarjeta-categoria',
  standalone: true,
  imports: [CommonModule, TarjetaProductoComponent],
  templateUrl: './tarjeta-categoria.component.html',
  styleUrl: './tarjeta-categoria.component.css'
})
export class TarjetaCategoriaComponent implements OnInit {

  ngOnInit(): void {
    this.getItems()
  }

  productosService = inject(ProductosService);

  productos: Producto[] = [];
  cantidad: number = 0

  @Input({ required: true }) categoria!: Categoria;
  localidades: number[] = [102, 103, 105]


  async getItems() {
    this.productos = await this.productosService.getByCategoria(this.categoria.idCategoria)
    this.productos.forEach(producto => {
      if (producto.stocks) {
        for (let index = 0; index < this.localidades.length; index++) {
          const element = producto.stocks[this.localidades[index]];
          if (element > 0) {
            this.cantidad += 1;
             break;
          }
        }
      }
    });

  }

}
