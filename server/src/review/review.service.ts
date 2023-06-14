import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateReviewInput } from '~/types/graphql';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.review.findMany();
  }

  create(userId: string, createReviewInput: CreateReviewInput) {
    return this.prisma.review.create({
      data: { userId, ...createReviewInput },
    });
  }

  async exists(userId: string, subjectId: string) {
    const row = await this.prisma.review.findUnique({
      where: { userId_subjectId: { userId, subjectId } },
    });

    return !!row;
  }
}
