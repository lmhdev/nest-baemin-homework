import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { menus as Menu } from '@prisma/client';

@Controller('menus')
export class MenusController {
  constructor(private readonly menuService: MenusService) {}

  @Post()
  async createMenu(
    @Body()
    data: {
      name: string;
      description?: string;
      price: number;
      restaurant_id: number;
    },
  ): Promise<Menu> {
    return this.menuService.createMenu(data);
  }

  @Get()
  async getAllMenus(): Promise<Menu[]> {
    return this.menuService.getAllMenus();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: number): Promise<Menu> {
    return this.menuService.getMenuById(id);
  }

  @Put(':id')
  async updateMenu(
    @Param('id') id: number,
    @Body() data: Partial<Menu>,
  ): Promise<Menu> {
    return this.menuService.updateMenu(id, data);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: number): Promise<Menu> {
    return this.menuService.deleteMenu(id);
  }
}
