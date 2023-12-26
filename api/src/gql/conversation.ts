import { GraphQLError } from "graphql";
import { GQLContext } from "../lib/types";
import { and, conversation, db, eq, or } from "@kepto/db";

export const typeDefs = /* GraphQL */ `
  type Conversation {
    id: ID!
  }

  type Mutation {
    createConv(id: ID!): Conversation!
  }
`;

export const resolvers = {
  Mutation: {
    createConv: async (
      _parent: unknown,
      { id }: { id: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("not authenticated");
      }

      let match;

      match = await db
        .select()
        .from(conversation)
        .where(
          and(
            or(
              eq(conversation.userId1, ctx.user.id),
              eq(conversation.userId1, id)
            ),
            or(
              eq(conversation.userId2, ctx.user.id),
              eq(conversation.userId2, id)
            )
          )
        );

      if (match[0]) {
        return match[0];
      }

      match = await db
        .insert(conversation)
        .values({ userId1: ctx.user.id, userId2: id })
        .returning();

      return match[0];
    },
  },
};
