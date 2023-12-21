import { GQLContext } from "../lib/types";
import { GraphQLError } from "graphql";
import { connect } from "../lib/connectLogic";

export const typeDefs = /* GraphQL */ `
  type Mutation {
    unconnect(userId: ID!): Boolean!
    connect(userId: ID!): Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    connect: async (
      _parent: unknown,
      { userId }: { userId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user.id) {
        throw new Error("Not authenticated");
      }

      await connect(userId, ctx.user.id, true);

      return true;
    },

    unconnect: async (
      _parent: unknown,
      { userId }: { userId: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authenticated");
      }

      await connect(userId, ctx.user.id, false);

      return true;
    },
  },
};
