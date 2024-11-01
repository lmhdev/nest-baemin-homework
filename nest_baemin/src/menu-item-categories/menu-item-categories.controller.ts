import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MenuItemCategoriesService } from './menu-item-categories.service';
import { menu_item_categories as MenuItemCategories } from '@prisma/client';

@Controller('menuitemcategories')
export class MenuItemCategoriesController {
  constructor(
    private readonly menuItemCategoryService: MenuItemCategoriesService,
  ) {}

  @Post()
  async addMenuItemCategory(
    @Body() data: { menu_item_id: number; category_id: number },
  ): Promise<MenuItemCategories> {
    return this.menuItemCategoryService.addMenuItemCategory(data);
  }

  @Get()
  async getAllMenuItemCategories(): Promise<MenuItemCategories[]> {
    return this.menuItemCategoryService.getAllMenuItemCategories();
  }

  @Get(':menu_item_id/:category_id')
  async getMenuItemCategory(
    @Param('menu_item_id', ParseIntPipe) menu_item_id: number,
    @Param('category_id', ParseIntPipe) category_id: number,
  ): Promise<MenuItemCategories> {
    return this.menuItemCategoryService.getMenuItemCategory(
      menu_item_id,
      category_id,
    );
  }

  @Delete(':menu_item_id/:category_id')
  async deleteMenuItemCategory(
    @Param('menu_item_id', ParseIntPipe) menu_item_id: number,
    @Param('category_id', ParseIntPipe) category_id: number,
  ): Promise<MenuItemCategories> {
    return this.menuItemCategoryService.deleteMenuItemCategory(
      menu_item_id,
      category_id,
    );
  }
}
