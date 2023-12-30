import { gql } from "graphql-request";

import { USER_INFO_FRAGMENT } from "../fragments";
import { gqlClient } from "../gqlClient";
import { User } from "../types";

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

export const getUsers = async (): Promise<{ users: User[] }> => {
  const res = await gqlClient.rawRequest<{ users: User[] }>(USERS_QUERY);
  return res.data;
};

export const getUserProfile = async (id: string): Promise<User> => {
  const res = await gqlClient.rawRequest<{ user: User }>(USER_PROFILE_QUERY, {
    id,
  });

  return res.data.user;
};

export const getMe = async (): Promise<{ me: User }> => {
  const res = await gqlClient.rawRequest<{ me: User }>(ME_QUERY);
  return res.data;
};

export const searchUser = async (usernameOrEmail: string): Promise<User[]> => {
  const res = await gqlClient.rawRequest<{ searchUser: User[] }>(
    SEARCH_USER_QUERY,
    { usernameOrEmail }
  );

  return res.data.searchUser;
};
