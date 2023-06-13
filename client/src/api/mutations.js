import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(
      credentialsInput: { username: $username, password: $password }
    ) {
      accessToken
    }
  }
`;

export const UPDATE_CHOICE = gql`
  mutation ($userId: String!, $optionId: String!) {
    updateChoice(updateChoiceInput: { id: $userId, optionId: $optionId }) {
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
