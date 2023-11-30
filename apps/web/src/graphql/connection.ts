import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";
import { graphqlUrl } from "@/lib/constants";

export interface Connection {
  id: string;
  connectorId: string;
  connecteeId: string;
  name: {
    id: string;
    avatarUrl: string;
    displayName: string;
    online: string;
  };
}

export const GET_CONNECTIONS_QUERY = gql`
  query Conns {
    getConnections {
      id
      connectorId
      name {
        id
        username
        avatarUrl
        displayName
        online
      }
      connecteeId
    }
  }
`;

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

export const getConnections = async (): Promise<Connection[]> => {
  const res = await gqlClient.rawRequest<{ getConnections: Connection[] }>(
    GET_CONNECTIONS_QUERY
  );
  return res.data.getConnections;
};
