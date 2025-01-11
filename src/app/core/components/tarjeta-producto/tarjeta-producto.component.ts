import { Component, Input, Signal, computed, inject} from '@angular/core';
import { Moneda, Producto } from '../../interfaces/producto';
import { CommonModule } from '@angular/common';
import { IMAGES_PRODUCTOS, WSP_LINK } from '../../constants';
import { CarritoService } from '../../services/carrito.service'; 
import Swal from 'sweetalert2';
import { ProductosService } from '../../services/productos.service';
import { ElegirMonedaComponent } from "../elegir-moneda/elegir-moneda.component";
import { ProductoShowcaseComponent } from "../producto-showcase/producto-showcase.component";


@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule, ElegirMonedaComponent, ProductoShowcaseComponent],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.css'
})
export class TarjetaProductoComponent{
  
  // monedaProducto = computed( () => this.moneda() );
  precio = computed( () => {
    let idMoneda = this.carritoService.moneda()?.idMoneda;
    if(idMoneda == undefined) idMoneda = 1;
    return this.productsService.getPrecio(true, this.producto);
  } );
  @Input({ required: true }) producto!: Producto;
  localidades: number[] = [102, 103, 105];
  url: string = IMAGES_PRODUCTOS;
  carritoService = inject(CarritoService);
  productsService = inject(ProductosService);
  

  getImage() {
    if (this.producto.image_name) {
      const image = this.producto.image_name.substring(0,this.producto.image_name.lastIndexOf('.')).replaceAll(' ', '_')
       return this.url + image.replaceAll( '&', '_')
    }
    return 'descargar.jpg'
  }

  

  fullDescription(){
    if(this.producto.codigo){
      return this.producto.descripcion+' -'+this.producto.codigo;
    }
    return this.producto.descripcion;
  }

  tieneStock(): boolean {
    if (this.producto.stocks) {
      for (let index = 0; index < this.localidades.length; index++) {
        const element = this.producto.stocks[this.localidades[index]];
        if (element > 0 || this.producto.etiquetasProductos != null && this.producto.etiquetasProductos.filter(ep => ep.idEtiqueta==7)) return true;
      }

    }
    return false
  }

  informacion(){
    const mensaje = 
`
Hola!, quisiera más información acerca de ${this.fullDescription()}. Muchas gracias!
`
    const link = `${WSP_LINK}?text=${encodeURI(mensaje)}`;
    window.open(link, "_blank");
  }

  agregarACarrito(){
    this.carritoService.agregarACarrito( this.producto );
    Swal.fire({
      position: "top-end",
      width:300,
      // heightAuto: true,
      icon: "success",
      title: "El  producto se ha agregado correctamente",
      showConfirmButton: false,
      timer: 1000
    });

  }





}
