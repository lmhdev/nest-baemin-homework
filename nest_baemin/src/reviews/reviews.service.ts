import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { reviews as Reviews } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(data: {
    restaurant_id?: number;
    user_id?: number;
    rating?: number;
    comment?: string;
  }): Promise<Reviews> {
    return this.prisma.reviews.create({ data });
  }

  async getAllReviews(): Promise<Reviews[]> {
    return this.prisma.reviews.findMany();
  }

  async getReviewById(id: number): Promise<Reviews> {
    const review = await this.prisma.reviews.findUnique({
      where: { review_id: id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async updateReview(id: number, data: Partial<Reviews>): Promise<Reviews> {
    const review = await this.prisma.reviews.update({
      where: { review_id: id },
      data,
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async deleteReview(id: number): Promise<Reviews> {
    const review = await this.prisma.reviews.delete({
      where: { review_id: id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }
}
