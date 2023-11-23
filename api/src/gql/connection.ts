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

  type GetConnection {
    connection: Connection
    errors: Error
  }

  type Mutation {
    createConnection(connecteeId: ID!, connectorId: ID!): GetConnection!
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
      let connection;

      try {
        connection = await db
          .insert(connections)
          .values({ connecteeId, connectorId })
          .returning();
      } catch (error: any) {
        console.log(error);
        if (error.detail.includes("already exists")) {
          return {
            errors: {
              message: error.detail,
              code: error.code,
            },
          };
        }
      }

      return {
        connection,
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
