import { gql } from '@apollo/client';

export const SUBSCRIBE_RESULTS = gql`
  subscription {
    resultChanged {
      id
      votes
    }
  }
`;
