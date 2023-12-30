import { GraphQLError } from "graphql";
import { GQLContext } from "../lib/types";
import { db } from "@kepto/db";

export const typeDefs = /* GraphQL */ `
  type Thread {
    id: ID!
    title: String!
    messageCount: String!
    reactionCount: String!
    topic: Topic
    topicId: String!
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
    topicId: String!
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
      {}: { data: { title: string; topicId: string; circleId: string } },
      ctx: GQLContext
    ) => {
      if (!ctx.user.id) {
        throw new GraphQLError("Not authenticated");
      }
    },
  },
};
