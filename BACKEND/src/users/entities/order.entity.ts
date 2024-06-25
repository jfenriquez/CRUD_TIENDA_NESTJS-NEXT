import { User } from './user.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderProduct } from './orderProduct.entity';
@Entity()
export class Order {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  user: User;
  Producto: Producto[];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP)',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP)',
  })
  createAt: Date;
  /////UN SUARIO SSOLO PUEDE TENER UNA ORDEN
  @ManyToOne(() => User, (user) => user.orders)
  user_id: User;

  //UN PRODUCTO PUEDE ESTAR EN VARIAS ORDENES
  @OneToMany(() => OrderProduct, (item) => item.order_id)
  Items: OrderProduct[];
}
