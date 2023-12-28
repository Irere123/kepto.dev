import { gql } from "graphql-request";

export const NEW_DIRECT_MESSAGE_SUBSCRIPTION = gql`
  subscription DirectMessageSub($conversationId: ID!) {
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
