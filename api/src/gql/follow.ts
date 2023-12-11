import { GQLContext } from "../lib/types";
import { GraphQLError } from "graphql";
import { follow } from "../lib/followLogic";

export const typeDefs = /* GraphQL */ `
  type Mutation {
    unfollow(userId: ID!): Boolean!
    follow(userId: ID!): Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    follow: async (
      _parent: unknown,
      { userId }: { userId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user.id) {
        throw new Error("Not authenticated");
      }

      await follow(userId, ctx.user.id, true);

      return true;
    },

    unfollow: async (
      _parent: unknown,
      { userId }: { userId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authenticated");
      }

      await follow(userId, ctx.user.id, false);

      return true;
    },
  },
};
