import { Stock } from "./stock";

export interface Moneda {
    idMoneda: number;
    siglas: string;
    nombre: string;
    tazaCambio: number;
}

export interface Precio {
    idPrecio: number;
    idProducto: number;
    idMoneda: number;
    precio: number;
}

export interface Descuento {
    idDescuento: number;
    color: number;
    valor: number;
    nombre: string,
    activo: boolean;
}

export interface EtiquetaProducto {
    idRelacion: number,
    idEtiqueta: number,
    idProducto: number,
    valor: string
}


export interface Producto {
    idProducto: number;
    codigo?: string;
    descripcion: string;
    precio: Precio;
    precios: Precio[];
    image_name?: string;
    ipv: boolean;
    activo: boolean;
    combo: boolean;
    idCategoria?: number;
    idDepartamento: number;
    movimientos?: [];
    etiquetasProductos?: EtiquetaProducto[];
    descuentos?: Descuento[];
    stocks?: number[]
}