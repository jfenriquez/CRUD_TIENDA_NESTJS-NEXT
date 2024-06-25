import { Injectable, NotFoundException } from '@nestjs/common';

import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(newOrder);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id) {
    return this.orderRepository.findOne(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    this.orderRepository.merge(order, updateOrderDto);
    return this.orderRepository.save(order);
  }
}
