import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { GQLContext } from "../lib/types";
import { db, eq, message, user } from "@kepto/db";
import { pubsub } from "../pubsub";

export const typeDefs = /* GraphQL */ `
  type Message {
    id: ID!
    connectionId: ID!
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

  input CreateMessageInput {
    connectionId: ID!
    receiverId: ID!
    text: String!
  }

  type Mutation {
    createMessage(data: CreateMessageInput!): Message!
  }

  type Subscription {
    newConnMessage(connectionId: ID!): Message!
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
        .where(eq(message.connectionId, connectionId))
        .orderBy(message.createdAt);
    },
  },
  Mutation: {
    createMessage: async (
      _parent: unknown,
      {
        data,
      }: { data: { receiverId: string; text: string; connectionId: string } },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("UNAUTHORIZED");
      }

      const msg = await db
        .insert(message)
        .values({
          connectionId: data.connectionId,
          receiverId: data.receiverId,
          userId: ctx.user.id,
          text: data.text,
        })
        .returning();

      pubsub.publish("NEW_MESSAGE", {
        newConnMessage: msg[0],
      });

      return msg[0];
    },
  },
  Subscription: {
    newConnMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("NEW_MESSAGE"),
        (payload, variables) => {
          return payload.newConnMessage.connectionId === variables.connectionId;
        }
      ),
    },
  },
};
