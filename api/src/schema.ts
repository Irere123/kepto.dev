import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

import * as global from "./gql/global";
import * as user from "./gql/user";
import * as connection from "./gql/connect";
import * as message from "./gql/message";

export const schema = makeExecutableSchema({
  typeDefs: [
    user.typeDefs,
    global.typeDefs,
    connection.typeDefs,
    message.typeDefs,
  ],
  resolvers: merge(user.resolvers, connection.resolvers, message.resolvers),
});
