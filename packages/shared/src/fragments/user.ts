import { gql } from "graphql-request";

export const USER_INFO_FRAGMENT = gql`
  fragment UserInfo on User {
    id
    username
    avatarUrl
    bio
    contributions
    createdAt
    updatedAt
    displayName
    email
    location
    numConnections
    numConnectors
    staff
    youAreConnected
  }
`;

export const CIRCLE_INFO_FRAGMENT = gql`
  fragment CircleInfo on Circle {
    id
    description
    name
    slug
    website
    creatorId
    members {
      id
      avatarUrl
      displayName
      username
    }
    updatedAt
    createdAt
  }
`;
