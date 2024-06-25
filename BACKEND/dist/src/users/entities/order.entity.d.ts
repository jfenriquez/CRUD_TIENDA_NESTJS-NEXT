import { User } from './user.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { OrderProduct } from './orderProduct.entity';
export declare class Order {
    id: number;
    user: User;
    Producto: Producto[];
    updateAt: Date;
    createAt: Date;
    user_id: User;
    Items: OrderProduct[];
}
