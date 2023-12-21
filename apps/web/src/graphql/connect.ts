import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";

export interface Connection {
  id: string;
}

export const UNCONNECT_MUTATION = gql`
  mutation Unconnect($userId: ID!) {
    unconnect(userId: $userId)
  }
`;

export const CONNECT_MUTATION = gql`
  mutation Connect($userId: ID!) {
    connect(userId: $userId)
  }
`;

export const connect = async (userId: string): Promise<boolean> => {
  const res = await gqlClient.rawRequest<{ connect: boolean }>(
    CONNECT_MUTATION,
    {
      userId,
    }
  );

  return res.data.connect;
};

export const unconnect = async (userId: string): Promise<boolean> => {
  const res = await gqlClient.rawRequest<{ unconnect: boolean }>(
    UNCONNECT_MUTATION,
    { userId }
  );

  return res.data.unconnect;
};
