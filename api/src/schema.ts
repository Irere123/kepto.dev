import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

import * as books from "./gql/books";

export const schema = makeExecutableSchema({
  typeDefs: [books.typeDefs],
  resolvers: merge(books.resolvers),
});
