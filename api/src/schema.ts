import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

import * as global from "./gql/global";
import * as user from "./gql/user";
import * as follow from "./gql/follow";
import * as message from "./gql/message";

export const schema = makeExecutableSchema({
  typeDefs: [user.typeDefs, global.typeDefs, follow.typeDefs, message.typeDefs],
  resolvers: merge(user.resolvers, follow.resolvers, message.resolvers),
});
