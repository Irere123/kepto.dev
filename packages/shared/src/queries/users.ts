import { gql } from "graphql-request";

import { USER_INFO_FRAGMENT } from "../fragments/user";

export const USER_PROFILE_QUERY = gql`
  ${USER_INFO_FRAGMENT}

  query GetUserProfile($id: ID!) {
    user(id: $id) {
      ...UserInfo
    }
  }
`;

export const ME_QUERY = gql`
  query {
    me {
      ...UserInfo
    }
  }

  ${USER_INFO_FRAGMENT}
`;

export const USERS_QUERY = gql`
  query Users {
    users {
      ...UserInfo
    }
  }

  ${USER_INFO_FRAGMENT}
`;

export const SEARCH_USER_QUERY = gql`
  query SearchUser($usernameOrEmail: String!) {
    searchUser(usernameOrEmail: $usernameOrEmail) {
      id
      username
      email
    }
  }
`;
