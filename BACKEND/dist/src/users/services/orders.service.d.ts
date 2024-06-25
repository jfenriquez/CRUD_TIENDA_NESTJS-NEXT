import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
export declare class OrdersService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: any): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
}
