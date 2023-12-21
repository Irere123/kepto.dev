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
  subscription ($conversationId: ID!) {
    newConvMessage(conversationId: $conversationId) {
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
  query GetMessages($conversationId: ID!) {
    conversationMessages(conversationId: $conversationId) {
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

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateConvMessage($data: CreateMessageInput!) {
    createConvMessage(data: $data) {
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

export const getMessages = async (
  connectionId: string
): Promise<ConnMessage[]> => {
  const res = await gqlClient.rawRequest<{ getMessages: ConnMessage[] }>(
    MESSAGES_QUERY,
    { connectionId }
  );
  return res.data.getMessages;
};

export const createMessage = async (data: {
  connectionId: string;
  text: string;
}): Promise<ConnMessage> => {
  const res = await gqlClient.rawRequest<{ createMessage: ConnMessage }>(
    CREATE_MESSAGE_MUTATION,
    { data }
  );
  return res.data.createMessage;
};
