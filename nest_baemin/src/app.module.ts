import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    PrismaModule,
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
  providers: [AppService],
})
export class AppModule {}
