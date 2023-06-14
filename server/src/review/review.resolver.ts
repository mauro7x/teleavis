import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { CreateReviewInput } from '~/types/graphql';
import {
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '~/auth/guards/authenticated.guard';
import { GetUser } from '~/decorators/get-user.decorator';
import { SubjectService } from '~/subject/subject.service';

@Resolver('Review')
export class ReviewResolver {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly subjectService: SubjectService,
  ) {}

  @Query()
  reviews() {
    return this.reviewService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Mutation()
  async createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @GetUser() user,
  ) {
    if (await this.reviewService.exists(user.id, createReviewInput.subjectId)) {
      throw new ConflictException(
        'You have already created one review for this subject',
      );
    }

    let result;
    try {
      result = await this.reviewService.create(user.id, createReviewInput);
    } catch (error) {
      throw new NotFoundException('Subject not found');
    }

    // Update subject's rating
    await this.subjectService.addRating(
      createReviewInput.subjectId,
      createReviewInput.rating,
    );

    return result;
  }
}
