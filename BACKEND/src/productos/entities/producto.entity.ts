import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
///import { Brand } from './brand.entity';
import { Categoria } from './categoria.entity';
import { Type } from 'class-transformer';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 250 })
  descripcion: string;

  @Column({ type: 'varchar', length: 250 })
  imagen: string;

  @Column({ type: 'varchar', length: 50 })
  precio: number;

  @Column({ type: 'varchar', length: 50 })
  stock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  //UNA MARCA MUCHOS PRODUCTOS
  @Column({ type: 'varchar', length: 50 })
  marca: string;

  //UNA CATEGORIA PUEDE TENER MUCHOS PRODUCTOS
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  ///@JoinColumn({ name: 'categoriaId', referencedColumnName: 'id' })
  categoria: Categoria;
}
