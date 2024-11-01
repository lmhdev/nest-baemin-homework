import { Module } from '@nestjs/common';
import { MenuItemCategoriesService } from './menu-item-categories.service';
import { MenuItemCategoriesController } from './menu-item-categories.controller';

@Module({
  providers: [MenuItemCategoriesService],
  controllers: [MenuItemCategoriesController]
})
export class MenuItemCategoriesModule {}
