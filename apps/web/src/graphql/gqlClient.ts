import { GraphQLClient } from "graphql-request";

import { graphqlUrl } from "~/lib/constants";

export const gqlClient = new GraphQLClient(graphqlUrl, {
  credentials: "include",
});
