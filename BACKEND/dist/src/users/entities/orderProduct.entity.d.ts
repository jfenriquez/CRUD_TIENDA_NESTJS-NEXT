import { User } from './user.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Order } from './order.entity';
export declare class OrderProduct {
    id: number;
    createAt: Date;
    quantity: number;
    user_id: User;
    producto_id: Producto;
    order_id: Order;
    status: string;
}
