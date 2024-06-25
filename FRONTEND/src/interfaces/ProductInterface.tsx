//import { Category } from "./CategoryInterface";

export interface ProductInterface {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: string;
  stock: string;
  fechaCreacion: Date;
  marca: string;
  categoria: Categoria;
  categoriaId?: number;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  estado: string;
  fecha_creacion: Date;
}
