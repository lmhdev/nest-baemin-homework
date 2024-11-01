import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { order_items as OrderItems } from '@prisma/client';

@Controller('orderitems')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  async createOrderItem(
    @Body()
    data: {
      order_id?: number;
      item_id?: number;
      quantity: number;
      price: number;
    },
  ): Promise<OrderItems> {
    return this.orderItemsService.createOrderItem(data);
  }

  @Get()
  async getAllOrderItems(): Promise<OrderItems[]> {
    return this.orderItemsService.getAllOrderItems();
  }

  @Get(':id')
  async getOrderItemById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderItems> {
    return this.orderItemsService.getOrderItemById(id);
  }

  @Put(':id')
  async updateOrderItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<OrderItems>,
  ): Promise<OrderItems> {
    return this.orderItemsService.updateOrderItem(id, data);
  }

  @Delete(':id')
  async deleteOrderItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderItems> {
    return this.orderItemsService.deleteOrderItem(id);
  }
}
