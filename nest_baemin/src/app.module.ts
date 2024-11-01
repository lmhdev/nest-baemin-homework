import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from 'prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { PaymentsModule } from './payments/payments.module';
import { DeliveryDetailsModule } from './delivery-details/delivery-details.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { MenuItemCategoriesModule } from './menu-item-categories/menu-item-categories.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RestaurantsModule,
    MenusModule,
    MenuItemsModule,
    OrdersModule,
    OrderItemsModule,
    PaymentsModule,
    DeliveryDetailsModule,
    ReviewsModule,
    CategoriesModule,
    MenuItemCategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
