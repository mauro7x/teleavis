import { gql } from '@apollo/client';

export const GET_ELECTORS = gql`
  query {
    electors {
      id
      firstName
      lastName
      choice {
        id
        name
      }
      votedAt
    }
  }
`;

export const GET_OPTIONS = gql`
  query {
    options {
      id
      name
    }
  }
`;

export const GET_RESULTS = gql`
  query {
    results {
      id
      name
      votes
    }
  }
`;
