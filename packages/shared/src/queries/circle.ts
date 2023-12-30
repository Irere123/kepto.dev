import { gql } from "graphql-request";
import { CIRCLE_INFO_FRAGMENT } from "../fragments";
import { Circle } from "../types";
import { gqlClient } from "../gqlClient";

export const GET_CIRCLE_QUERY = gql`
  query Circle($slug: String!) {
    circle(slug: $slug) {
      ...CircleInfo
    }
  }

  ${CIRCLE_INFO_FRAGMENT}
`;

export const GET_TOP_CIRCLES_QUERY = gql`
  ${CIRCLE_INFO_FRAGMENT}

  query ($limit: Int!) {
    circles(limit: $limit) {
      ...CircleInfo
    }
  }
`;

export const USER_CIRCLES_LIST_QUERY = gql`
  query {
    userCirclesList {
      id
      description
      name
      slug
    }
  }
`;

export const getTopCircles = async (
  limit: number = 20
): Promise<{ circles: Circle[] }> => {
  const res = await gqlClient.rawRequest<{ circles: Circle[] }>(
    GET_TOP_CIRCLES_QUERY,
    { limit }
  );

  return res.data;
};

export const userCirclesList = async (): Promise<{
  userCirclesList: Circle[];
}> => {
  const res = await gqlClient.rawRequest<{ userCirclesList: Circle[] }>(
    USER_CIRCLES_LIST_QUERY
  );

  return res.data;
};
