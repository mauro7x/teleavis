import { gql } from '@apollo/client';

export const GET_PRIVATE = gql`
  query {
    private
  }
`;

export const GET_PUBLIC = gql`
  query {
    public
  }
`;
