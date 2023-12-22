import { GraphQLError } from "graphql";
import { GQLContext } from "../lib/types";
import { and, conversation, conversationMember, db, eq, user } from "@kepto/db";

export const typeDefs = /* GraphQL */ `
  type Mutation {
    createConv(username: String!): Boolean
  }
`;

export const resolvers = {
  Mutation: {
    createConv: async (
      _parent: unknown,
      { username }: { username: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("not authenticated");
      }

      const user1 = await db
        .select()
        .from(user)
        .where(eq(user.username, username));

      if (!user1[0]) {
        return false;
      }

      const conv = await db
        .select()
        .from(conversation)
        .where(eq(conversation.creatorId, ctx.user.id));

      const convM = await db
        .select()
        .from(conversationMember)
        .where(
          and(
            eq(conversationMember.conversationId, conv[0].id),
            eq(conversationMember.userId, user1[0].id)
          )
        );

      if (!convM) {
        return true;
      }

      await db.transaction(async (tx) => {
        const conv = await tx
          .insert(conversation)
          .values({ creatorId: ctx.user.id })
          .returning();

        await tx.insert(conversationMember).values({
          conversationId: conv[0].id,
          userId: user1[0].id,
        });

        await tx.insert(conversationMember).values({
          conversationId: conv[0].id,
          userId: ctx.user.id,
        });
      });
      return true;
    },
  },
};
