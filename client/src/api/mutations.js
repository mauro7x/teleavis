import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation ($createReviewInput: CreateReviewInput!) {
    createReview(createReviewInput: $createReviewInput) {
      subjectId
      createdOn
      modifiedOn
      rating
      amountOfWorkRating
      difficultyRating
      teacherRating
      comment
    }
  }
`;
