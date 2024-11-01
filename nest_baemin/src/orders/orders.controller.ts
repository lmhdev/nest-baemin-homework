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
import { OrdersService } from './orders.service';
import { orders as Orders } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body()
    data: {
      customer_id?: number;
      restaurant_id?: number;
      driver_id?: number;
      status: string;
      total_price?: number;
      delivery_fee?: number;
    },
  ): Promise<Orders> {
    return this.ordersService.createOrder(data);
  }

  @Get()
  async getAllOrders(): Promise<Orders[]> {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Orders> {
    return this.ordersService.getOrderById(id);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Orders>,
  ): Promise<Orders> {
    return this.ordersService.updateOrder(id, data);
  }

  @Delete(':id')
  async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<Orders> {
    return this.ordersService.deleteOrder(id);
  }
}
