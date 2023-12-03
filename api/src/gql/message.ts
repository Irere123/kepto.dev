import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { GQLContext } from "../lib/types";
import { db, eq, connMessage, user, and, or } from "@kepto/db";
import { pubsub } from "../pubsub";

export const typeDefs = /* GraphQL */ `
  type Message {
    id: ID!
    senderId: ID!
    connectionId: ID!
    text: String!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getMessages(connectionId: ID!): [Message]
  }

  input CreateMessageInput {
    userId: ID!
    connectionId: ID!
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
    user: async ({ senderId }: { senderId: string }) => {
      const users = await db
        .select()
        .from(user)
        .where(eq(user.id, senderId))
        .limit(1);

      return users[0];
    },
  },
  Query: {
    getMessages: async (
      _parent: unknown,
      { userId }: { userId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("UNAUTHORIZED");
      }

      return await db
        .select()
        .from(connMessage)
        .where(
          or(
            and(
              eq(connMessage.recipientId, ctx.user.id),
              eq(connMessage.senderId, userId)
            ),
            and(
              eq(connMessage.senderId, ctx.user.id),
              eq(connMessage.recipientId, userId)
            )
          )
        )
        .orderBy(connMessage.createdAt);
    },
  },
  Mutation: {
    createMessage: async (
      _parent: unknown,
      {
        data,
      }: { data: { text: string; userId: string; connectionId: string } },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("UNAUTHORIZED");
      }

      const msg = await db
        .insert(connMessage)
        .values({
          connectionId: data.connectionId,
          senderId: ctx.user.id,
          recipientId: data.userId,
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
