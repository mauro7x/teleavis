import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateReviewInput } from '~/types/graphql';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.review.findMany();
  }

  findByUserId(userId: string) {
    return this.prisma.review.findMany({ where: { userId } });
  }

  create(user: User, { subjectId, ...createReviewInput }: CreateReviewInput) {
    return this.prisma.review.create({
      data: {
        user: {
          connectOrCreate: {
            where: {
              id: user.id,
            },
            create: user,
          },
        },
        subject: {
          connect: {
            id: subjectId,
          },
        },
        ...createReviewInput,
      },
    });
  }

  async exists(userId: string, subjectId: string) {
    const row = await this.prisma.review.findUnique({
      where: { userId_subjectId: { userId, subjectId } },
    });

    return !!row;
  }
}
