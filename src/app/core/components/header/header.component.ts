import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Busqueda } from '../../interfaces/busqueda';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(private router: Router) { }
  carritoService = inject(CarritoService);

  carritoItems = computed ( () => this.carritoService.items());

  busqueda: Busqueda = {
    texto: "",
  }

  buscar() {
    if (this.busqueda.texto.trim().length > 0) {
      this.router.navigate(['productos/buscar', this.busqueda.texto])
    }

  }

  clearBusqueda(){
    this.busqueda.texto = '';
  }

}
