import { gql } from '@apollo/client';

export const GET_TRACKS = gql`
  query {
    tracks {
      id
      name
    }
  }
`;
