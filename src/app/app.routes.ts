import { Routes } from '@angular/router';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "departamentos",
        component: HomeComponent
    },
    {
        path: "departamentos/:id",
        component: DepartamentoComponent
    },
    {
        path: "categorias",
        pathMatch: 'full',
        component: CategoriaComponent
    },
    {
        path: "categorias/:id",
        component: ProductoComponent
    },
    {
        path: "productos",
        pathMatch: 'full',
        component: ProductoComponent
    },
    {
        path: "productos/buscar/:texto",
        component: BuscarComponent
    },
];
