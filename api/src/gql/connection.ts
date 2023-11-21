import { AnyTable, connections, db } from "@kepto/db";
import { GQLContext } from "../lib/types";
import { GraphQLError } from "graphql";

export const typeDefs = /* GraphQL */ `
  type Connection {
    id: ID
    connectorId: ID
    connecteeId: ID
    connector: User
    connectee: User
    createdAt: DateTime
  }

  type Mutation {
    createConnection(connecteeId: ID!, connectorId: ID!): Connection
  }

  type GetConnection {
    connection: Connection
    errors: [Error]
  }

  type Query {
    getConnections: GetConnection!
  }
`;

export const resolvers = {
  Mutation: {
    createConnection: async (
      _parent: unknown,
      { connecteeId, connectorId }: { connectorId: string; connecteeId: string }
    ) => {
      let conn;
      try {
        conn = await db
          .insert(connections)
          .values({ connecteeId, connectorId })
          .returning()
          .onConflictDoNothing();
      } catch (err: any) {
        return { errors: { message: err.message } };
      }

      return {
        connection: conn,
      };
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
