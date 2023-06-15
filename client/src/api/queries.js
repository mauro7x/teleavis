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
      nbReviews
      cumRating
      reviews {
        userId
        rating
        comment
      }
    }
  }
`;
