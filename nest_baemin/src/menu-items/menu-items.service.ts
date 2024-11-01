import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { menu_items as MenuItems } from '@prisma/client';

@Injectable()
export class MenuItemService {
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

  async getAllMenuItems(): Promise<MenuItems[]> {
    return this.prisma.menu_items.findMany();
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
