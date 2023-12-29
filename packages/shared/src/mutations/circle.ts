import { gql } from "graphql-request";

import { CIRCLE_INFO_FRAGMENT } from "../fragments";
import { CreateCircleResponse } from "../types";
import { gqlClient } from "../gqlClient";

export const CREATE_CIRCLE_MUTATION = gql`
  mutation CreateCircle($input: CreateCircleInput!) {
    createCircle(input: $input) {
      circle {
        ...CircleInfo
      }
      errors {
        field
        message
      }
    }
  }

  ${CIRCLE_INFO_FRAGMENT}
`;

export const createCircle = async (input: {
  name: string;
  description: string;
}): Promise<CreateCircleResponse> => {
  const res = await gqlClient.rawRequest<{
    createCircle: CreateCircleResponse;
  }>(CREATE_CIRCLE_MUTATION, { input });

  return res.data.createCircle;
};
