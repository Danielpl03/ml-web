import { Stock } from "./stock";

export interface Moneda{
    idMoneda: number;
    siglas: string;
    nombre: string;
    tazaCambio: number;
}

export interface Precio{
    idPrecio: number;
    idProducto: number;
    idMoneda: number;
    precio: number;
}


export interface Producto {
    idProducto: number;
    codigo?: string;
    descripcion: string;
    precio: Precio;
    precios: Precio[];
    image_name?: string;
    activo: boolean;
    idCategoria?: number;
    idDepartamento: number;
    movimientos?: [];
    etiquetasProductos?: [];
    stocks?: number[]
}