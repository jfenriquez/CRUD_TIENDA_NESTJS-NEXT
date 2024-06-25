import { User } from './user.entity';
import { Producto } from '../../productos/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP)',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP)',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Column({ type: 'int' })
  quantity: number;

  /////UN USUARIO SSOLO PUEDE TENER UNA ORDEN
  @ManyToOne(() => User, (user) => user.orders)
  user_id: User;

  //UN PRODUCTO PUEDE ESTAR EN VARIAS ORDENES
  @ManyToOne(() => Producto, (producto) => producto)
  producto_id: Producto;

  ////  UNA ORDEN PUEDE TENER MUCHOS PRODUCTOS
  @ManyToOne(() => Order, (order) => order.Items)
  order_id: Order;

  @Column({ type: 'varchar', length: 150 })
  status: string;
}
