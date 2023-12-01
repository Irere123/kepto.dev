import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";

interface ConnMessage {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string;
  };
}

export const NEW_MESSAGE_SUBSCRIPTION_QUERY = gql`
  subscription ($connectionId: ID!) {
    newConnMessage(connectionId: $connectionId) {
      createdAt
      id
      text
      user {
        id
        username
        displayName
      }
      createdAt
      updatedAt
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query GetMessages($connectionId: ID!) {
    getMessages(connectionId: $connectionId) {
      id
      receiverId
      text
      user {
        id
        username
        displayName
      }
      createdAt
      updatedAt
    }
  }
`;

export const getMessages = async (
  connectionId: string
): Promise<ConnMessage[]> => {
  const res = await gqlClient.rawRequest<{ getMessages: ConnMessage[] }>(
    MESSAGES_QUERY,
    { connectionId }
  );
  return res.data.getMessages;
};
