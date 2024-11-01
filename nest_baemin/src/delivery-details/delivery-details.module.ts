import { Module } from '@nestjs/common';
import { DeliveryDetailsService } from './delivery-details.service';
import { DeliveryDetailsController } from './delivery-details.controller';

@Module({
  providers: [DeliveryDetailsService],
  controllers: [DeliveryDetailsController]
})
export class DeliveryDetailsModule {}
