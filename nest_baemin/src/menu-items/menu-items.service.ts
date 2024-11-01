import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { menu_items as MenuItems } from '@prisma/client';

@Injectable()
export class MenuItemsService {
  constructor(private prisma: PrismaService) {}

  async createMenuItem(data: {
    menu_id?: number;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
  }): Promise<MenuItems> {
    return this.prisma.menu_items.create({ data });
  }

  async getAllMenuItems(page: number = 1, limit: number = 10, search?: string) {
    const offset = (page - 1) * limit;
    const menuItems = await this.prisma.menu_items.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip: offset,
      take: Number(limit),
    });
    const total = await this.prisma.menu_items.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    const totalPages = Math.ceil(total / limit);
    return {
      data: menuItems,
      pagination: {
        page,
        limit: Number(limit),
        total: Number(total),
        totalPages,
      },
    };
  }

  async getMenuItemById(id: number): Promise<MenuItems> {
    const menuItem = await this.prisma.menu_items.findUnique({
      where: { item_id: Number(id) },
    });
    if (!menuItem) {
      throw new NotFoundException(`MenuItem with ID ${id} not found`);
    }
    return menuItem;
  }

  async updateMenuItem(
    id: number,
    data: Partial<MenuItems>,
  ): Promise<MenuItems> {
    const menuItem = await this.prisma.menu_items.update({
      where: { item_id: id },
      data,
    });
    if (!menuItem) {
      throw new NotFoundException(`MenuItem with ID ${id} not found`);
    }
    return menuItem;
  }

  async deleteMenuItem(id: number): Promise<MenuItems> {
    const menuItem = await this.prisma.menu_items.delete({
      where: { item_id: id },
    });
    if (!menuItem) {
      throw new NotFoundException(`MenuItem with ID ${id} not found`);
    }
    return menuItem;
  }
}
