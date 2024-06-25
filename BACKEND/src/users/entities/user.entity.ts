import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  phone: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  recovery_token: string;

  @Column({ type: 'varchar', length: 50 })
  rol: string;

  @Expose()
  get fullName(): string {
    return `${this.nombre} ${this.apellido}`;
  }
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];
}
