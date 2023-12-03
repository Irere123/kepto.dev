import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";

export interface Connection {
  id: string;
}

export const REMOVE_CONNECTION_QUERY = gql`
  mutation RemoveConn($userId: ID!) {
    removeConnection(userId: $userId)
  }
`;

export const CREATE_CONNECTION_QUERY = gql`
  mutation CreateConn($userId: ID!) {
    createConnection(userId: $userId)
  }
`;

export const createConnection = async (userId: string): Promise<boolean> => {
  const res = await gqlClient.rawRequest<{ createConnection: boolean }>(
    CREATE_CONNECTION_QUERY,
    { userId }
  );

  return res.data.createConnection;
};

export const removeConnection = async (userId: string): Promise<boolean> => {
  const res = await gqlClient.rawRequest<{ removeConnection: boolean }>(
    REMOVE_CONNECTION_QUERY,
    { userId }
  );

  return res.data.removeConnection;
};
