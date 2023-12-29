import { gql } from "graphql-request";
import { gqlClient } from "../gqlClient";

export const CREATE_CONV_MUTATION = gql`
  mutation CreateConv($id: ID!) {
    createConv(id: $id) {
      id
    }
  }
`;

export const createConv = async (
  id: string
): Promise<{ createConv: { id: string } }> => {
  const res = await gqlClient.rawRequest<{ createConv: { id: string } }>(
    CREATE_CONV_MUTATION,
    { id }
  );

  return res.data;
};
