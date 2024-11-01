import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { order_items as OrderItems } from '@prisma/client';

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

  async createOrderItem(data: {
    order_id?: number;
    item_id?: number;
    quantity: number;
    price: number;
  }): Promise<OrderItems> {
    return this.prisma.order_items.create({ data });
  }

  async getAllOrderItems(): Promise<OrderItems[]> {
    return this.prisma.order_items.findMany();
  }

  async getOrderItemById(id: number): Promise<OrderItems> {
    const orderItem = await this.prisma.order_items.findUnique({
      where: { order_item_id: Number(id) },
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID ${id} not found`);
    }
    return orderItem;
  }

  async updateOrderItem(
    id: number,
    data: Partial<OrderItems>,
  ): Promise<OrderItems> {
    const orderItem = await this.prisma.order_items.update({
      where: { order_item_id: id },
      data,
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID ${id} not found`);
    }
    return orderItem;
  }

  async deleteOrderItem(id: number): Promise<OrderItems> {
    const orderItem = await this.prisma.order_items.delete({
      where: { order_item_id: id },
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID ${id} not found`);
    }
    return orderItem;
  }
}
