import { Stock } from "./stock";

export interface Producto {
    idProducto: number;
    codigo?: string;
    descripcion: string;
    precio: number;
    image_name?: string;
    activo: boolean;
    idCategoria?: number;
    idDepartamento: number;
    movimientos?: [];
    etiquetasProductos?: [];
    stocks?: number[]
}