import { gql } from "graphql-request";

import { gqlClient } from "./gqlClient";

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio?: string | null;
  avatarUrl: string;
  contributions: number;
  createdAt: string;
  email: string;
  location: string;
  numConnectors: number;
  numConnections: number;
  youAreConnected: boolean;
  staff: boolean;
  updatedAt: string;
  online: boolean;
}

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
    staff
    online
    youAreConnected
    numConnections
    numConnectors
  }
`;

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

export const getUsers = async (): Promise<{ users: UserProfile[] }> => {
  const res = await gqlClient.rawRequest<{ users: UserProfile[] }>(USERS_QUERY);
  return res.data;
};

export const getUserProfile = async (id: string): Promise<UserProfile> => {
  const res = await gqlClient.rawRequest<{ user: UserProfile }>(
    USER_PROFILE_QUERY,
    { id }
  );

  return res.data.user;
};

export const getMe = async (): Promise<{ me: UserProfile }> => {
  const res = await gqlClient.rawRequest<{ me: UserProfile }>(ME_QUERY);
  return res.data;
};

export const searchUser = async (
  usernameOrEmail: string
): Promise<UserProfile[]> => {
  const res = await gqlClient.rawRequest<{ searchUser: UserProfile[] }>(
    SEARCH_USER_QUERY,
    { usernameOrEmail }
  );

  return res.data.searchUser;
};
