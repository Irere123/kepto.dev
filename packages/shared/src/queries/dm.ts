import { gql } from "graphql-request";
import { DirectMessage } from "../types";
import { gqlClient } from "../gqlClient";

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

export const getDirectMessages = async (
  conversationId: string
): Promise<{ directMessages: DirectMessage[] }> => {
  const res = await gqlClient.rawRequest<{ directMessages: DirectMessage[] }>(
    DMS_QUERY,
    { conversationId }
  );
  return res.data;
};
