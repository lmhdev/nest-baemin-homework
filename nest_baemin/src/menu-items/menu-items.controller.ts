import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { menu_items as MenuItems } from '@prisma/client';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemService: MenuItemsService) {}

  @Post()
  async createMenuItem(
    @Body()
    data: {
      menu_id?: number;
      name: string;
      description?: string;
      price: number;
      image_url?: string;
    },
  ): Promise<MenuItems> {
    return this.menuItemService.createMenuItem(data);
  }

  @Get()
  async getAllMenuItems(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    return this.menuItemService.getAllMenuItems(page, limit, search);
  }

  @Get(':id')
  async getMenuItemById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MenuItems> {
    return this.menuItemService.getMenuItemById(id);
  }

  @Put(':id')
  async updateMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<MenuItems>,
  ): Promise<MenuItems> {
    return this.menuItemService.updateMenuItem(id, data);
  }

  @Delete(':id')
  async deleteMenuItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MenuItems> {
    return this.menuItemService.deleteMenuItem(id);
  }
}
