import { gql } from "graphql-request";
import { gqlClient } from "../gqlClient";
import { Conversation } from "../types";

export const CONVERSATIONS_QUERY = gql`
  query Conversations {
    conversations {
      id
      avatarUrl
      displayName
      createdAt
      message {
        text
        createdAt
      }
    }
  }
`;

export const GET_CONVERSATION_QUERY = gql`
  query ($conversationId: ID!) {
    conversation(id: $conversationId) {
      id
      avatarUrl
      displayName
    }
  }
`;

export const getConversations = async (): Promise<{
  conversations: Conversation[];
}> => {
  const res = await gqlClient.rawRequest<{ conversations: Conversation[] }>(
    CONVERSATIONS_QUERY
  );
  return res.data;
};

export const getConversation = async (
  convId: string
): Promise<{
  conversation: Conversation;
}> => {
  const res = await gqlClient.rawRequest<{ conversation: Conversation }>(
    GET_CONVERSATION_QUERY,
    { conversationId: convId }
  );
  return res.data;
};
