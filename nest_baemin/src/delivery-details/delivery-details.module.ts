import { Module } from '@nestjs/common';
import { DeliveryDetailsService } from './delivery-details.service';
import { DeliveryDetailsController } from './delivery-details.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DeliveryDetailsService],
  controllers: [DeliveryDetailsController],
})
export class DeliveryDetailsModule {}
