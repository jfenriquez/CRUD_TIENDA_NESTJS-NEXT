import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 150 })
  descripcion: string;

  @Column({ type: 'varchar', length: 250 })
  imagen: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  estado: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  ////UMA CATEGORIA MUCHOS PRODUCTOS
  @OneToMany(() => Producto, (productos) => productos)
  productos: Producto[];
}
