import { gql } from '@apollo/client';

export const GET_TRACKS = gql`
  query {
    tracks {
      id
      name
    }
  }
`;

export const GET_SUBJECTS = gql`
  query ($trackId: String) {
    subjects(trackId: $trackId) {
      id
      name
      nReviews
      cumRating
      nAmountOfWorkRatings
      cumAmountOfWorkRating
      nDifficultyRatings
      cumDifficultyRating
      nTeacherRatings
      cumTeacherRating
      reviews {
        createdOn
        comment
      }
    }
  }
`;

export const GET_SUBJECT_NAMES = gql`
  query ($trackId: String) {
    subjects(trackId: $trackId) {
      id
      name
    }
  }
`;

export const GET_MY_REVIEWS = gql`
  query {
    myReviews {
      subject {
        id
        name
      }
      teacherRating
      rating
      modifiedOn
      difficultyRating
      createdOn
      comment
      amountOfWorkRating
    }
  }
`;
