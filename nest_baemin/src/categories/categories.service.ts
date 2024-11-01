import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { categories as Categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: {
    name: string;
    description?: string;
  }): Promise<Categories> {
    return this.prisma.categories.create({ data });
  }

  async getAllCategories(): Promise<Categories[]> {
    return this.prisma.categories.findMany();
  }

  async getCategoryById(id: number): Promise<Categories> {
    const category = await this.prisma.categories.findUnique({
      where: { category_id: id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async updateCategory(
    id: number,
    data: Partial<Categories>,
  ): Promise<Categories> {
    const category = await this.prisma.categories.update({
      where: { category_id: id },
      data,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async deleteCategory(id: number): Promise<Categories> {
    const category = await this.prisma.categories.delete({
      where: { category_id: id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
}
