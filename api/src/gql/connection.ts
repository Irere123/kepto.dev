import { connections, db } from "@kepto/db";
import { GQLContext } from "../lib/types";
import { GraphQLError } from "graphql";

export const typeDefs = /* GraphQL */ `
  type Connection {
    id: ID!
    connectorId: ID!
    connecteeId: ID!
    connector: User
    connectee: User
    createdAt: DateTime
  }

  type Mutation {
    createConnection(connecteeId: ID!, connectorId: ID!): Connection
  }

  type Query {
    getConnections: [Connection]
  }
`;

export const resolvers = {
  Mutation: {
    createConnection: async (
      _parent: unknown,
      { connecteeId, connectorId }: { connectorId: string; connecteeId: string }
    ) => {
      const conn = await db
        .insert(connections)
        .values({ connecteeId, connectorId })
        .returning();

      return conn[0];
    },
  },
  Query: {
    getConnections: async (_parent: unknown, _args: {}, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authonticated");
      }

      return await db.select().from(connections);
    },
  },
};
