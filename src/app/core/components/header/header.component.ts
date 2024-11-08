import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Busqueda } from '../../interfaces/busqueda';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) { }

  busqueda: Busqueda = {
    texto: "",
  }

  buscar() {
    if (this.busqueda.texto.trim().length > 0) {
      this.router.navigate(['productos/buscar', this.busqueda.texto])
    }

  }

}
