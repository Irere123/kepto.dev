import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";

export interface Connection {
  id: string;
}

export const UNFOLLOW_MUTATION = gql`
  mutation Unfollow($userId: ID!) {
    unfollow(userId: $userId)
  }
`;

export const FOLLOW_MUTATION = gql`
  mutation Follow($userId: ID!) {
    follow(userId: $userId)
  }
`;

export const follow = async (userId: string): Promise<boolean> => {
  const res = await gqlClient.rawRequest<{ follow: boolean }>(FOLLOW_MUTATION, {
    userId,
  });

  return res.data.follow;
};

export const unfollow = async (userId: string): Promise<boolean> => {
  const res = await gqlClient.rawRequest<{ unfollow: boolean }>(
    UNFOLLOW_MUTATION,
    { userId }
  );

  return res.data.unfollow;
};
