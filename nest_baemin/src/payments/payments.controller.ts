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
import { PaymentsService } from './payments.service';
import { payments as Payments } from '@prisma/client';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(
    @Body()
    data: {
      order_id?: number;
      amount: number;
      method: string;
      status: string;
    },
  ): Promise<Payments> {
    return this.paymentsService.createPayment(data);
  }

  @Get()
  async getAllPayments(): Promise<Payments[]> {
    return this.paymentsService.getAllPayments();
  }

  @Get(':id')
  async getPaymentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Payments> {
    return this.paymentsService.getPaymentById(id);
  }

  @Put(':id')
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Payments>,
  ): Promise<Payments> {
    return this.paymentsService.updatePayment(id, data);
  }

  @Delete(':id')
  async deletePayment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Payments> {
    return this.paymentsService.deletePayment(id);
  }
}
