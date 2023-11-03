import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

import * as user from "./gql/user";
import * as global from "./gql/global";

export const schema = makeExecutableSchema({
  typeDefs: [user.typeDefs, global.typeDefs],
  resolvers: merge(user.resolvers),
});
