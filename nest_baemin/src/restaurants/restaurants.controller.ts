import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { restaurants as Restaurant } from '@prisma/client';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async createRestaurant(
    @Body() data: { name: string; address: string; owner_id: number },
  ): Promise<Restaurant> {
    return this.restaurantsService.createRestaurant(data);
  }

  @Get()
  async getAllRestaurants(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.restaurantsService.getAllRestaurants(page, limit);
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantsService.getRestaurantById(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: number,
    @Body() data: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return this.restaurantsService.updateRestaurant(id, data);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantsService.deleteRestaurant(id);
  }
}
