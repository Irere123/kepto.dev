import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";

export interface DirectMessage {
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

export const NEW_DM_SUBSCRIPTION_QUERY = gql`
  subscription ($conversationId: ID!) {
    newDirectMessage(conversationId: $conversationId) {
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

export const DMS_QUERY = gql`
  query GetMessages($conversationId: ID!) {
    directMessages(conversationId: $conversationId) {
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

export const CREATE_DM_MUTATION = gql`
  mutation CreateDirectMessage($data: CreateDmInput!) {
    createDirectMessage(data: $data) {
      id
      text
      conversationId
      user {
        id
        username
      }
      userId
      createdAt
      updatedAt
    }
  }
`;

export const getDirectMessages = async (
  conversationId: string
): Promise<{ directMessages: DirectMessage[] }> => {
  const res = await gqlClient.rawRequest<{ directMessages: DirectMessage[] }>(
    DMS_QUERY,
    { conversationId }
  );
  return res.data;
};

export const createDirectMessage = async (data: {
  conversationId: string;
  text: string;
}): Promise<DirectMessage> => {
  const res = await gqlClient.rawRequest<{ createMessage: DirectMessage }>(
    CREATE_DM_MUTATION,
    { data }
  );
  return res.data.createMessage;
};
