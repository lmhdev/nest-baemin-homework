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
import { ReviewsService } from './reviews.service';
import { reviews as Reviews } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async createReview(
    @Body()
    data: {
      restaurant_id?: number;
      user_id?: number;
      rating?: number;
      comment?: string;
    },
  ): Promise<Reviews> {
    return this.reviewsService.createReview(data);
  }

  @Get()
  async getAllReviews(): Promise<Reviews[]> {
    return this.reviewsService.getAllReviews();
  }

  @Get(':id')
  async getReviewById(@Param('id', ParseIntPipe) id: number): Promise<Reviews> {
    return this.reviewsService.getReviewById(id);
  }

  @Put(':id')
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Reviews>,
  ): Promise<Reviews> {
    return this.reviewsService.updateReview(id, data);
  }

  @Delete(':id')
  async deleteReview(@Param('id', ParseIntPipe) id: number): Promise<Reviews> {
    return this.reviewsService.deleteReview(id);
  }
}
