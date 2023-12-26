import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

import * as global from "./gql/global";
import * as user from "./gql/user";
import * as connection from "./gql/connect";
import * as message from "./gql/message";
import * as conversation from "./gql/conversation";
import * as dm from "./gql/dm";

export const schema = makeExecutableSchema({
  typeDefs: [
    user.typeDefs,
    global.typeDefs,
    connection.typeDefs,
    message.typeDefs,
    conversation.typeDefs,
    dm.typeDefs,
  ],
  resolvers: merge(
    user.resolvers,
    connection.resolvers,
    message.resolvers,
    conversation.resolvers,
    dm.resolvers
  ),
});
