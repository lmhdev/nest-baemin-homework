import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { payments as Payments } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(data: {
    order_id?: number;
    amount: number;
    method: string;
    status: string;
  }): Promise<Payments> {
    return this.prisma.payments.create({ data });
  }

  async getAllPayments(): Promise<Payments[]> {
    return this.prisma.payments.findMany();
  }

  async getPaymentById(id: number): Promise<Payments> {
    const payment = await this.prisma.payments.findUnique({
      where: { payment_id: id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async updatePayment(id: number, data: Partial<Payments>): Promise<Payments> {
    const payment = await this.prisma.payments.update({
      where: { payment_id: id },
      data,
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async deletePayment(id: number): Promise<Payments> {
    const payment = await this.prisma.payments.delete({
      where: { payment_id: id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }
}
