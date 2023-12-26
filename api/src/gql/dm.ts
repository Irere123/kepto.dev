import { db, directMessage, eq, user } from "@kepto/db";
import { GQLContext } from "../lib/types";
import { GraphQLError } from "graphql";
import { pubsub } from "../pubsub";
import { withFilter } from "graphql-subscriptions";

const NEW_DIRECT_MESSAGE = "NEW_DIRECT_MESSAGE";

export const typeDefs = /* GraphQL */ `
  type DirectMessage {
    id: ID!
    text: String!
    conversationId: ID!
    user: User!
    userId: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateDmInput {
    conversationId: ID!
    text: String!
  }

  type Mutation {
    createDirectMessage(data: CreateDmInput!): DirectMessage!
  }

  type Query {
    directMessages(conversationId: ID!): [DirectMessage]!
  }

  type Subscription {
    newDirectMessage(conversationId: ID!): DirectMessage!
  }
`;

export const resolvers = {
  DirectMessage: {
    user: async ({ userId }: { userId: string }, _args: {}) => {
      return (await db.select().from(user).where(eq(user.id, userId))).at(0);
    },
  },
  Query: {
    directMessages: async (
      _parent: unknown,
      { conversationId }: { conversationId: string }
    ) =>
      await db
        .select()
        .from(directMessage)
        .where(eq(directMessage.conversationId, conversationId)),
  },
  Mutation: {
    createDirectMessage: async (
      _parent: unknown,
      { data }: { data: { conversationId: string; text: string } },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("not authenticated");
      }

      const dm = await db
        .insert(directMessage)
        .values({
          conversationId: data.conversationId,
          userId: ctx.user.id,
          text: data.text,
        })
        .returning();

      pubsub.publish(NEW_DIRECT_MESSAGE, {
        newDirectMessage: dm[0],
      });

      return dm[0];
    },
  },
  Subscription: {
    newDirectMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_DIRECT_MESSAGE),
        (payload, variables) => {
          return (
            payload.newDirectMessage.conversationId === variables.conversationId
          );
        }
      ),
    },
  },
};
