import { Producto } from './producto.entity';
export declare class Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    estado: boolean;
    fecha_creacion: Date;
    productos: Producto[];
}
