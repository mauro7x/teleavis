import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { SubjectService } from '~/subject/subject.service';

@Module({
  providers: [ReviewResolver, ReviewService, SubjectService],
})
export class ReviewModule {}
