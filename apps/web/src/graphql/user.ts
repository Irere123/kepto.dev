import { User } from "@kepto/db";
import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";

export const ME_QUERY = gql`
  query {
    me {
      id
      bio
      contributions
      displayName
      username
      avatarUrl
      email
      location
      online
      staff
      updateAt
      createdAt
    }
  }
`;

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      bio
      contributions
      displayName
      username
      avatarUrl
      email
      location
      online
      staff
      updateAt
      createdAt
    }
  }
`;

export const getUsers = async (): Promise<{ users: User[] }> => {
  const res = await gqlClient.rawRequest<{ users: User[] }>(USERS_QUERY);
  return res.data;
};

export const getMe = async (): Promise<{ me: User }> => {
  const res = await gqlClient.rawRequest<{ me: User }>(ME_QUERY);
  return res.data;
};
