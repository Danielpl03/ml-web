import { Component, Input} from '@angular/core';
import { Departamento } from '../../interfaces/departamento';
import { CommonModule } from '@angular/common';
import { IMAGES_DEPARTAMENTOS } from '../../constants';

@Component({
  selector: 'app-tarjeta-departamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-departamento.component.html',
  styleUrl: './tarjeta-departamento.component.css'
})
export class TarjetaDepartamentoComponent {

  @Input({required: true}) departamento!:Departamento;
  url: string = IMAGES_DEPARTAMENTOS


  getImage() {
    if (this.departamento.image_name) {
      const image = this.departamento.image_name.replaceAll(' ', '_').split('.')[0];
    
      return this.url + image.replaceAll( '&', '_')
    }

    return 'descargar.jpg'

  }

}
