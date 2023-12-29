import { gql } from "graphql-request";

import { gqlClient } from "../gqlClient";
import { DirectMessage } from "../types";

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
