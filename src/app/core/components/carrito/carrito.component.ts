import { Component, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto';
import { IMAGES_PRODUCTOS, WSP_LINK, WSP_VENTAS_LINK } from '../../constants';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../contador-cantidad/contador-cantidad.component";
import { RouterModule } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  carritoService = inject(CarritoService);
  clipboard = inject(ClipboardService)
  url: string = IMAGES_PRODUCTOS;


  getImage(producto: Producto) {
    if (producto.image_name) {
      const image = producto.image_name.replaceAll(' ', '_').split('.')[0];
      return this.url + image.replaceAll('&', '_')
    }
    return 'descargar.jpg'
  }

  fullDescription(producto: Producto) {
    if (producto.codigo) {
      return producto.descripcion + ' -' + producto.codigo;
    }
    return producto.descripcion;
  }

  enviarPedido() {
    let pedido = '';
    for (let i = 0; i < this.carritoService.getItems().length; i++) {
      const item = this.carritoService.getItems()[i];
      pedido += `- ${item.cantidad} ${item.cantidad > 9 ? '*' : ' *'} ${this.fullDescription(item.producto)}\n`;
    }
    const mensaje =
      `
Hola!, quiero hacer el siguiente pedido:
${pedido}
Espero su respuesta. Muchas gracias!
`
    this.clipboard.copyFromContent(mensaje);
    Swal.fire({
      title: "El pedido ha sido copiado al portapapeles!\nDesea enviarlo ahora?",
      showDenyButton: true,
      confirmButtonText: "Enviar",
      denyButtonText: `Más tarde`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const link = `${WSP_LINK}?text=${encodeURI(mensaje)}`;
        window.open(link, "_blank");
      } else if (result.isDenied) {
        Swal.fire("El pedido no se ha enviado", "", "info");
      }
    });
  }

}
