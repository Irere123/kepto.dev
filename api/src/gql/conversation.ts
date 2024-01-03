import { GraphQLError } from "graphql";
import { GQLContext } from "../lib/types";
import { and, conversation, db, eq, or, sql } from "@kepto/db";

export const typeDefs = /* GraphQL */ `
  type Conversation {
    id: ID!
    avatarUrl: String!
    displayName: String!
    message: DirectMessage
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Mutation {
    createConv(id: ID!): Conversation!
  }

  type Query {
    conversations: [Conversation!]
    conversation(id: ID!): Conversation!
  }
`;

export const resolvers = {
  Query: {
    conversations: async (_parent: unknown, _args: {}, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authenticated");
      }

      const convs = await db.execute(sql`
      select
      case
        when u.id = co."userId1" then co.read2
        else co.read1
      end "read",
      co.id "id",
      u.id "userId", u."avatarUrl", u."displayName", date_part('epoch', co."createdAt") * 1000 "createdAt",
      (select json_build_object('text',
      case when char_length(text) > 40
      then substr(text, 0, 40) || '...'
      else text
      end
      , 'createdAt', date_part('epoch', m."createdAt")*1000)
      from direct_messages m
      where (m."userId" = co."userId1" or m."userId" = co."userId2") and m."conversationId" = co.id 
      
      order by m."createdAt" desc limit 1) message
      from conversations co
      inner join "users" u on u.id != ${ctx.user.id} and (u.id = co."userId1" or u.id = co."userId2")
      where (co."userId1" = ${ctx.user.id} or co."userId2" = ${ctx.user.id})
      limit 150
      `);

      return convs.rows;
    },
    conversation: async (
      _parent: unknown,
      { id }: { id: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authenticated");
      }

      const convs = await db.execute(sql`
      select
      case
        when u.id = co."userId1" then co.read2
        else co.read1
      end "read",
      co.id "id",
      u.id "userId", u."avatarUrl", u."displayName", date_part('epoch', co."createdAt") * 1000 "createdAt",
      (select json_build_object('text',
      case when char_length(text) > 40
      then substr(text, 0, 40) || '...'
      else text
      end
      , 'createdAt', date_part('epoch', m."createdAt")*1000)
      from direct_messages m
      where (m."userId" = co."userId1" or m."userId" = co."userId2") and m."conversationId" = co.id
      order by m."createdAt" desc limit 1) message
      from conversations co
      inner join "users" u on u.id != ${ctx.user.id} and (u.id = co."userId1" or u.id = co."userId2")
      where (co."userId1" = ${ctx.user.id} or co."userId2" = ${ctx.user.id}) and co.id = ${id}
      limit 1
      `);

      return convs.rows[0];
    },
  },
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
          or(
            and(
              eq(conversation.userId1, ctx.user.id),
              eq(conversation.userId2, id)
            ),
            and(
              eq(conversation.userId2, ctx.user.id),
              eq(conversation.userId1, id)
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
