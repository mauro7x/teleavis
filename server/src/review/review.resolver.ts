import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { CreateReviewInput } from '~/types/graphql';
import {
  BadRequestException,
  ConflictException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '~/auth/guards/authenticated.guard';
import { GetUser } from '~/decorators/get-user.decorator';
import { RatingType, SubjectService } from '~/subject/subject.service';

const optionalRatings: RatingType[] = [
  'amountOfWorkRating',
  'teacherRating',
  'difficultyRating',
];

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
    // TODO: Transactional logic to implement (fault tolerance)

    if (await this.reviewService.exists(user.id, createReviewInput.subjectId)) {
      throw new ConflictException(
        'You have already created a review for this subject',
      );
    }

    // TODO: More data validation
    // Validation of ratings
    [...optionalRatings, 'rating'].forEach((ratingProp) => {
      if (
        ratingProp in createReviewInput &&
        (createReviewInput[ratingProp] < 0 || createReviewInput[ratingProp] > 5)
      ) {
        throw new BadRequestException(
          `Invalid ${ratingProp} value(s) (should be from 0 to 5)`,
        );
      }
    });

    let result;
    try {
      result = await this.reviewService.create(user, createReviewInput);
    } catch (error) {
      Logger.warn(error);
      throw new NotFoundException('Subject not found');
    }

    // Update subject's main rating
    await this.subjectService.addRating(
      createReviewInput.subjectId,
      'generalRating',
      createReviewInput.rating,
    );

    // Update others ratings
    const promises = [];
    optionalRatings.forEach((ratingProp) => {
      if (ratingProp in createReviewInput) {
        promises.push(
          this.subjectService.addRating(
            createReviewInput.subjectId,
            ratingProp,
            createReviewInput[ratingProp],
          ),
        );
      }
    });
    if (promises.length > 0) {
      await Promise.all(promises);
    }

    Logger.log('Review created', result);

    return result;
  }
}
