import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categories as Categories } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body() data: { name: string; description?: string },
  ): Promise<Categories> {
    return this.categoryService.createCategory(data);
  }

  @Public()
  @Get()
  async getAllCategories(): Promise<Categories[]> {
    return this.categoryService.getAllCategories();
  }

  @Public()
  @Get(':id')
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Categories> {
    return this.categoryService.getCategoryById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Categories>,
  ): Promise<Categories> {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Categories> {
    return this.categoryService.deleteCategory(id);
  }
}
