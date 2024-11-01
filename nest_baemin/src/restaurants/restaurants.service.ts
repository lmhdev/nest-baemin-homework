import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { restaurants as Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async createRestaurant(data: {
    name: string;
    address: string;
    owner_id: number;
  }): Promise<Restaurant> {
    return this.prisma.restaurants.create({ data });
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.prisma.restaurants.findMany();
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurants.findUnique({
      where: { restaurant_id: Number(id) },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async updateRestaurant(
    id: number,
    data: Partial<Restaurant>,
  ): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurants.update({
      where: { restaurant_id: id },
      data,
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async deleteRestaurant(id: number): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurants.delete({
      where: { restaurant_id: id },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }
}
