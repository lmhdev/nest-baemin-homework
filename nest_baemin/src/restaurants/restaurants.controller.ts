import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { restaurants as Restaurant } from '@prisma/client';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Post()
  async createRestaurant(
    @Body() data: { name: string; address: string; owner_id: number },
  ): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(data);
  }

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurants();
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantService.getRestaurantById(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: number,
    @Body() data: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return this.restaurantService.updateRestaurant(id, data);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantService.deleteRestaurant(id);
  }
}
