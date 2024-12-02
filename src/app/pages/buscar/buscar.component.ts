import { Component, OnDestroy, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { BusqueResult, Busqueda } from '../../core/interfaces/busqueda';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { TarjetaDepartamentoComponent } from '../../core/components/tarjeta-departamento/tarjeta-departamento.component';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';

import { BusquedaService } from '../../core/services/busqueda.service';
import { LoadingComponent } from '../../core/components/loading/loading.component';
import { SeoService } from '../../core/services/seo.service';
import { ProductosService } from '../../core/services/productos.service';
import { ElegirMonedaComponent } from "../../core/components/elegir-moneda/elegir-moneda.component";
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [LoadingComponent, RouterModule, TarjetaCategoriaComponent, TarjetaDepartamentoComponent, TarjetaProductoComponent, ElegirMonedaComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit, OnDestroy {

  seo = inject(SeoService);
  carritoService = inject(CarritoService);
  // moneda = computed( ()  => this.carritoService.moneda() );


  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      if (params['texto']) {
        const text: string = params['texto'];
        if (text.trim().length > 0) {
          this.busqueda.texto = text.trim();
          this.buscar(this.busqueda);
          
          this.seo.title.setTitle(`Resultados para ${this.busqueda.texto} | M&L SOLUCIONES`);
          this.seo.meta.updateTag({ name: "description", content: `Resultados para ${this.busqueda.texto} en M&L SOLUCIONES` });
          this.seo.setCanonicalUrl(`buscar/${text}`);
          this.seo.setIndexFollow(true);
        }
      } else {
        this.busquedaService.busqueda().texto = '';
        this.router.navigate(['departamentos'])
      }
    })
  }

  constructor(private router: Router) { }
  ngOnDestroy(): void {
    this.busquedaService.busqueda().texto = '';
  }


  busquedaService = inject(BusquedaService)
  productosService = inject(ProductosService);
  busquedaResult = signal<BusqueResult | undefined>(undefined)
  emptyResult = signal<Boolean | undefined>(undefined)

  ac = inject(ActivatedRoute);
  busqueda: Busqueda = {
    texto: ""
  }

  searchCompleted: WritableSignal<Boolean> = signal(false);

  async buscar(busqueda: Busqueda) {
    this.searchCompleted.set(false)

      this.busquedaService.buscar(busqueda).then(result => {
        this.busquedaResult.set(result);
        this.searchCompleted.set(true);
        if (this.busquedaResult()!.departamentos!.length>0 || this.busquedaResult()!.categorias!.length>0 || this.busquedaResult()!.productos!.length>0) {
          this.emptyResult.set(false)
        } else {
          this.emptyResult.set(true)
        }
      })
  }





}
