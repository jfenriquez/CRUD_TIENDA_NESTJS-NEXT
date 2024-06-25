import { Categoria } from './categoria.entity';
export declare class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    stock: number;
    fechaCreacion: Date;
    marca: string;
    categoria: Categoria;
}
