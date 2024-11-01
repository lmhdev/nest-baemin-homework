import { Module } from '@nestjs/common';
import { MenuItemCategoriesService } from './menu-item-categories.service';
import { MenuItemCategoriesController } from './menu-item-categories.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MenuItemCategoriesService],
  controllers: [MenuItemCategoriesController],
})
export class MenuItemCategoriesModule {}
