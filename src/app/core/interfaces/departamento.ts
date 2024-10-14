import { Categoria } from "./categoria";
import { Producto } from "./producto";

export interface Departamento {
    idDepartamento: number;
    nombre: string;
    image_name?: string;
    categorias?: Categoria[];
    productos?: Producto[];
}