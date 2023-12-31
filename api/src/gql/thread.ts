import { GraphQLError } from "graphql";
import { GQLContext } from "../lib/types";
import { db, thread } from "@kepto/db";

export const typeDefs = /* GraphQL */ `
  type Thread {
    id: ID!
    title: String!
    messageCount: String!
    reactionCount: String!
    circleId: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    thread(id: ID!): Thread
    threads: [Thread!]
  }

  input CreateThreadInput {
    title: String!
    circleId: String!
  }

  type CreateThreadResponse {
    thread: Thread
    errors: [FieldError]
  }

  type Mutation {
    createThread(data: CreateThreadInput!): CreateThreadResponse!
  }
`;

export const resolvers = {
  Query: {
    thread: () => {},
    threads: async (_parent: unknown, _args: {}, ctx: GQLContext) => {
      return [];
    },
  },
  Mutation: {
    createThread: async (
      _parent: unknown,
      { data }: { data: { title: string; circleId: string } },
      ctx: GQLContext
    ) => {
      if (!ctx.user.id) {
        throw new GraphQLError("Not authenticated");
      }

      if (data.title.length < 3) {
        return {
          errors: [{ field: "title", message: "Your title is too short" }],
        };
      }

      const threadArr = await db
        .insert(thread)
        .values({
          circleId: data.circleId,
          title: data.title,
          userId: ctx.user.id,
        })
        .returning();

      return threadArr[0];
    },
  },
};
