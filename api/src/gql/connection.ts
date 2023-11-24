import { AnyTable, and, connections, db, eq, user } from "@kepto/db";
import { GQLContext } from "../lib/types";
import { GraphQLError } from "graphql";
import { connect } from "../lib/connectLogic";

export const typeDefs = /* GraphQL */ `
  type Connection {
    id: ID
    connectorId: ID
    connecteeId: ID
    connector: User
    connectee: User
    createdAt: DateTime
  }

  type GetConnection {
    connection: Connection
    errors: Error
  }

  type Mutation {
    createConnection(connecteeId: ID!): Boolean!
    removeConnection(connecteeId: ID!): Boolean!
  }

  type Query {
    getConnections: [Connection!]
  }
`;

export const resolvers = {
  Connection: {
    connectee: async ({ connecteeId }: { connecteeId: string }) => {
      return (await db.select().from(user).where(eq(user.id, connecteeId))).at(
        0
      );
    },
    connector: async ({ connectorId }: { connectorId: string }) => {
      return (await db.select().from(user).where(eq(user.id, connectorId))).at(
        0
      );
    },
  },
  Mutation: {
    createConnection: async (
      _parent: unknown,
      { connecteeId }: { connecteeId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user.id) {
        throw new Error("Not authenticated");
      }

      await connect(ctx.user.id, connecteeId, true);

      return true;
    },

    removeConnection: async (
      _parent: unknown,
      { connecteeId }: { connecteeId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authenticated");
      }

      await connect(ctx.user.id, connecteeId, false);

      return true;
    },
  },

  Query: {
    getConnections: async (_parent: unknown, _args: {}, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authonticated");
      }

      return await db
        .select()
        .from(connections)
        .where(eq(connections.connectorId, ctx.user.id));
    },
  },
};
