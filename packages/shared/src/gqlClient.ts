import { GraphQLClient } from "graphql-request";

import { graphqlUrl } from "./constants";

export const gqlClient = new GraphQLClient(graphqlUrl, {
  credentials: "include",
});
