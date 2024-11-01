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
import { DeliveryDetailsService } from './delivery-details.service';
import { delivery_details as DeliveryDetails } from '@prisma/client';

@Controller('deliverydetails')
export class DeliveryDetailsController {
  constructor(
    private readonly deliveryDetailsService: DeliveryDetailsService,
  ) {}

  @Post()
  async createDeliveryDetail(
    @Body()
    data: {
      order_id?: number;
      driver_id?: number;
      status?: string;
      pickup_address?: string;
      delivery_address?: string;
      estimated_delivery_time?: Date;
      actual_delivery_time?: Date;
    },
  ): Promise<DeliveryDetails> {
    return this.deliveryDetailsService.createDeliveryDetail(data);
  }

  @Get()
  async getAllDeliveryDetails(): Promise<DeliveryDetails[]> {
    return this.deliveryDetailsService.getAllDeliveryDetails();
  }

  @Get(':id')
  async getDeliveryDetailById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeliveryDetails> {
    return this.deliveryDetailsService.getDeliveryDetailById(id);
  }

  @Put(':id')
  async updateDeliveryDetail(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<DeliveryDetails>,
  ): Promise<DeliveryDetails> {
    return this.deliveryDetailsService.updateDeliveryDetail(id, data);
  }

  @Delete(':id')
  async deleteDeliveryDetail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeliveryDetails> {
    return this.deliveryDetailsService.deleteDeliveryDetail(id);
  }
}
