import { gql } from "graphql-request";

export const USER_INFO_FRAGMENT = gql`
  fragment UserInfo on User {
    id
    username
    displayName
    cre
  }
`;
