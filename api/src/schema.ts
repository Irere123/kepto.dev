import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

import * as global from "./gql/global";
import * as user from "./gql/user";
import * as connection from "./gql/connection";

export const schema = makeExecutableSchema({
  typeDefs: [user.typeDefs, global.typeDefs, connection.typeDefs],
  resolvers: merge(user.resolvers, connection.resolvers),
});
