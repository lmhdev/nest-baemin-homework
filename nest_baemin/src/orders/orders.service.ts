import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { orders as Orders } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: {
    customer_id?: number;
    restaurant_id?: number;
    driver_id?: number;
    status: string;
    total_price?: number;
    delivery_fee?: number;
  }): Promise<Orders> {
    return this.prisma.orders.create({ data });
  }

  async getAllOrders(): Promise<Orders[]> {
    return this.prisma.orders.findMany();
  }

  async getOrderById(id: number): Promise<Orders> {
    const order = await this.prisma.orders.findUnique({
      where: { order_id: Number(id) },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateOrder(id: number, data: Partial<Orders>): Promise<Orders> {
    const order = await this.prisma.orders.update({
      where: { order_id: id },
      data,
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async deleteOrder(id: number): Promise<Orders> {
    const order = await this.prisma.orders.delete({ where: { order_id: id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}
