import { Component, Input} from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CommonModule } from '@angular/common';
import { IMAGES_PRODUCTOS } from '../../constants';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.css'
})
export class TarjetaProductoComponent{


  @Input({ required: true }) producto!: Producto
  localidades: number[] = [102, 103, 105];
  url: string = IMAGES_PRODUCTOS;

  getImage() {
    if (this.producto.image_name) {
      const image = this.producto.image_name.replaceAll(' ', '_').split('.')[0];
      return this.url + image.replaceAll( '&', '_')
    }

    return 'descargar.jpg'

  }

  tieneStock(): boolean {
    if (this.producto.stocks) {
      for (let index = 0; index < this.localidades.length; index++) {
        const element = this.producto.stocks[this.localidades[index]];
        if (element > 0) return true;
      }

    }
    return false
  }

}
