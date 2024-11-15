import { Producto } from "./producto";

export interface ItemCarrito {
    producto: Producto,
    cantidad: number,
    importe: number,
}

export interface Carrito {
    id: number;
    items: ItemCarrito[]
}

