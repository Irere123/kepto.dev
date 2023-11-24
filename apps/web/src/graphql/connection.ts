import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";

export const REMOVE_CONNECTION_QUERY = gql`
  mutation RemoveConn($connecteeId: ID!) {
    removeConnection(connecteeId: $connecteeId)
  }
`;

export const CREATE_CONNECTION_QUERY = gql`
  mutation CreateConn($connecteeId: ID!) {
    createConnection(connecteeId: $connecteeId)
  }
`;

export const createConnection = async (
  connecteeId: string
): Promise<boolean> => {
  const res = await gqlClient.rawRequest<{ createConnection: boolean }>(
    CREATE_CONNECTION_QUERY,
    { connecteeId }
  );

  return res.data.createConnection;
};

export const removeConnection = async (
  connecteeId: string
): Promise<boolean> => {
  const res = await gqlClient.rawRequest<{ removeConnection: boolean }>(
    REMOVE_CONNECTION_QUERY,
    { connecteeId }
  );

  return res.data.removeConnection;
};
