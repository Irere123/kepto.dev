import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { GQLContext } from "../lib/types";
import { db, eq, convMessage, user, and, or } from "@kepto/db";
import { pubsub } from "../pubsub";

export const typeDefs = /* GraphQL */ `
  type ConversationMessage {
    id: ID!
    senderId: ID!
    conversationId: ID!
    text: String!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    conversationMessages(conversationId: ID!): [ConversationMessage]
  }

  input CreateConvMessageInput {
    userId: ID!
    conversationId: ID!
    text: String!
  }

  type Mutation {
    createConvMessage(data: CreateConvMessageInput!): ConversationMessage!
  }

  type Subscription {
    newConvMessage(conversationId: ID!): ConversationMessage!
  }
`;

export const resolvers = {
  ConversationMessage: {
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
    conversationMessages: async (
      _parent: unknown,
      { userId }: { userId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("UNAUTHORIZED");
      }

      return await db
        .select()
        .from(convMessage)
        .where(
          or(
            and(
              eq(convMessage.recipientId, ctx.user.id),
              eq(convMessage.senderId, userId)
            ),
            and(
              eq(convMessage.senderId, ctx.user.id),
              eq(convMessage.recipientId, userId)
            )
          )
        )
        .orderBy(convMessage.createdAt);
    },
  },
  Mutation: {
    createConvMessage: async (
      _parent: unknown,
      {
        data,
      }: { data: { text: string; userId: string; conversationId: string } },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("UNAUTHORIZED");
      }

      const msg = await db
        .insert(convMessage)
        .values({
          conversationId: data.conversationId,
          senderId: ctx.user.id,
          recipientId: data.userId,
          text: data.text,
        })
        .returning();

      pubsub.publish("NEW_MESSAGE", {
        newConvMessage: msg[0],
      });

      return msg[0];
    },
  },
  Subscription: {
    newConvMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("NEW_MESSAGE"),
        (payload, variables) => {
          return (
            payload.newConvMessage.conversationId === variables.conversationId
          );
        }
      ),
    },
  },
};
