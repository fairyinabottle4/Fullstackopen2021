import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation authorizeMutation($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      user {
        username
      }
      id
      repositoryId
      createdAt
      text
      rating
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;


export const DELETE_REVIEW = gql`
  mutation DeleteRevies($id: ID!) {
    deleteReview(id: $id)
  }
`;
