import { gql } from "graphql-request";
import { gqlClient } from "./gqlClient";

export const CREATE_CONV_MUTATION = gql`
  mutation CreateConv($username: String!) {
    createConv(username: $username)
  }
`;

export const createConv = async (
  username: string
): Promise<{ createConv: boolean }> => {
  const res = await gqlClient.rawRequest<{ createConv: boolean }>(
    CREATE_CONV_MUTATION,
    { username }
  );

  return res.data;
};
