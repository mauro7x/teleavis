import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { compareByOrder } from './utils';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.subject.findUnique({ where: { id } });
  }

  async findAllByTrack(trackId: string) {
    const data = await this.prisma.subject.findMany({
      where: {
        tracks: {
          some: {
            trackId,
          },
        },
      },
      include: {
        tracks: true,
        reviews: true,
      },
    });

    // Sort by order
    data.sort(compareByOrder(trackId));

    return data;
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  addRating(id: string, rating: number) {
    return this.prisma.subject.update({
      where: { id },
      data: { nbReviews: { increment: 1 }, cumRating: { increment: rating } },
    });
  }
}
