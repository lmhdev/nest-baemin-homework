import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { menus as Menu } from '@prisma/client';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async createMenu(data: {
    name: string;
    description?: string;
    price: number;
    restaurant_id: number;
  }): Promise<Menu> {
    return this.prisma.menus.create({ data });
  }

  async getAllMenus(): Promise<Menu[]> {
    return this.prisma.menus.findMany();
  }

  async getMenuById(id: number): Promise<Menu> {
    const menu = await this.prisma.menus.findUnique({ where: { menu_id: id } });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  async updateMenu(id: number, data: Partial<Menu>): Promise<Menu> {
    const menu = await this.prisma.menus.update({
      where: { menu_id: id },
      data,
    });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  async deleteMenu(id: number): Promise<Menu> {
    const menu = await this.prisma.menus.delete({ where: { menu_id: id } });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }
}
