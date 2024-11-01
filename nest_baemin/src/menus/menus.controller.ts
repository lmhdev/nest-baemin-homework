import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { menus as Menu } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';

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

  @Public()
  @Get()
  async getAllMenus(): Promise<Menu[]> {
    return this.menuService.getAllMenus();
  }

  @Public()
  @Get(':id')
  async getMenuById(@Param('id') id: number): Promise<Menu> {
    return this.menuService.getMenuById(id);
  }

  @Public()
  @Get('restaurant/:id')
  async getMenuByRestaurantId(@Param('id') id: string): Promise<Menu[]> {
    const restaurantId = parseInt(id, 10);
    if (isNaN(restaurantId)) {
      throw new NotFoundException(`Invalid restaurant ID: ${id}`);
    }
    return await this.menuService.getMenuByRestaurantId(restaurantId);
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
