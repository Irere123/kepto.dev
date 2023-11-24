import { GraphQLError } from "graphql";
import { GQLContext } from "../lib/types";
import { db, eq, message, user } from "@kepto/db";

export const typeDefs = /* GraphQL */ `
  type Message {
    id: ID!
    text: String!
    userId: ID!
    receiverId: ID!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getMessages(connectionId: ID!): [Message]
  }
`;

export const resolvers = {
  Message: {
    user: async ({ userId }: { userId: string }) => {
      const users = await db
        .select()
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

      return users[0];
    },
  },
  Query: {
    getMessages: async (
      _parent: unknown,
      { connectionId }: { connectionId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("UNAUTHORIZED");
      }

      return await db
        .select()
        .from(message)
        .where(eq(message.connectionId, connectionId));
    },
  },
};
