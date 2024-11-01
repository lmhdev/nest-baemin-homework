import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { delivery_details as DeliveryDetails } from '@prisma/client';

@Injectable()
export class DeliveryDetailsService {
  constructor(private prisma: PrismaService) {}

  async createDeliveryDetail(data: {
    order_id?: number;
    driver_id?: number;
    status?: string;
    pickup_address?: string;
    delivery_address?: string;
    estimated_delivery_time?: Date;
    actual_delivery_time?: Date;
  }): Promise<DeliveryDetails> {
    return this.prisma.delivery_details.create({ data });
  }

  async getAllDeliveryDetails(): Promise<DeliveryDetails[]> {
    return this.prisma.delivery_details.findMany();
  }

  async getDeliveryDetailById(id: number): Promise<DeliveryDetails> {
    const deliveryDetail = await this.prisma.delivery_details.findUnique({
      where: { delivery_id: id },
    });
    if (!deliveryDetail) {
      throw new NotFoundException(`DeliveryDetail with ID ${id} not found`);
    }
    return deliveryDetail;
  }

  async updateDeliveryDetail(
    id: number,
    data: Partial<DeliveryDetails>,
  ): Promise<DeliveryDetails> {
    const deliveryDetail = await this.prisma.delivery_details.update({
      where: { delivery_id: id },
      data,
    });
    if (!deliveryDetail) {
      throw new NotFoundException(`DeliveryDetail with ID ${id} not found`);
    }
    return deliveryDetail;
  }

  async deleteDeliveryDetail(id: number): Promise<DeliveryDetails> {
    const deliveryDetail = await this.prisma.delivery_details.delete({
      where: { delivery_id: id },
    });
    if (!deliveryDetail) {
      throw new NotFoundException(`DeliveryDetail with ID ${id} not found`);
    }
    return deliveryDetail;
  }
}
