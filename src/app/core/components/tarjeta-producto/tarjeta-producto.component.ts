import { Component, Input, Signal, computed, inject} from '@angular/core';
import { Moneda, Producto } from '../../interfaces/producto';
import { CommonModule } from '@angular/common';
import { IMAGES_PRODUCTOS, WSP_LINK } from '../../constants';
import { CarritoService } from '../../services/carrito.service'; 
import Swal from 'sweetalert2';
import { ProductosService } from '../../services/productos.service';
import { ElegirMonedaComponent } from "../elegir-moneda/elegir-moneda.component";


@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule, ElegirMonedaComponent],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.css'
})
export class TarjetaProductoComponent{
  
  // monedaProducto = computed( () => this.moneda() );
  precio = computed( () => {
    const idMoneda = this.carritoService.moneda()!.idMoneda;
    return this.getPrecio(idMoneda);
  } );
  @Input({ required: true }) producto!: Producto;
  localidades: number[] = [102, 103, 105];
  url: string = IMAGES_PRODUCTOS;
  carritoService = inject(CarritoService);
  productsService = inject(ProductosService);
  

  getImage() {
    if (this.producto.image_name) {
      const image = this.producto.image_name.replaceAll(' ', '_').split('.')[0];
      return this.url + image.replaceAll( '&', '_')
    }
    return 'descargar.jpg'
  }

  getPrecio(idMoneda: number){

    if (idMoneda == 1){
      return this.producto.precio.precio;
    }
    const precios = this.producto.precios;
    for (let i = 0; i < precios.length; i++) {
      const precio = precios[i];
      if (precio.idMoneda == idMoneda) {
        return precio.precio;
      }
    }
    const taza = this.carritoService.getTazaCambio();
    return (Math.round(this.producto.precio.precio / (taza?taza:300) * 10) / 10)
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
        if (element > 0) return true;
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
