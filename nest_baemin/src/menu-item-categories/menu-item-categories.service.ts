import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { menu_item_categories as MenuItemCategories } from '@prisma/client';

@Injectable()
export class MenuItemCategoriesService {
  constructor(private prisma: PrismaService) {}

  async addMenuItemCategory(data: {
    menu_item_id: number;
    category_id: number;
  }): Promise<MenuItemCategories> {
    return this.prisma.menu_item_categories.create({ data });
  }

  async getAllMenuItemCategories(): Promise<MenuItemCategories[]> {
    return this.prisma.menu_item_categories.findMany();
  }

  async getMenuItemCategory(
    menu_item_id: number,
    category_id: number,
  ): Promise<MenuItemCategories> {
    const menuItemCategory = await this.prisma.menu_item_categories.findUnique({
      where: { menu_item_id_category_id: { menu_item_id, category_id } },
    });
    if (!menuItemCategory) {
      throw new NotFoundException(
        `MenuItemCategory with Menu Item ID ${menu_item_id} and Category ID ${category_id} not found`,
      );
    }
    return menuItemCategory;
  }

  async deleteMenuItemCategory(
    menu_item_id: number,
    category_id: number,
  ): Promise<MenuItemCategories> {
    const menuItemCategory = await this.prisma.menu_item_categories.delete({
      where: { menu_item_id_category_id: { menu_item_id, category_id } },
    });
    if (!menuItemCategory) {
      throw new NotFoundException(
        `MenuItemCategory with Menu Item ID ${menu_item_id} and Category ID ${category_id} not found`,
      );
    }
    return menuItemCategory;
  }
}
