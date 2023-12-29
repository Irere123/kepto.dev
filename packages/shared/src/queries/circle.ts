import { gql } from "graphql-request";
import { CIRCLE_INFO_FRAGMENT } from "../fragments";

export const GET_CIRCLE_QUERY = gql`
  query Circle($slug: String!) {
    circle(slug: $slug) {
      ...CircleInfo
    }
  }

  ${CIRCLE_INFO_FRAGMENT}
`;
