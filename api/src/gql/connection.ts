import { GQLContext } from "../lib/types";
import { GraphQLError } from "graphql";
import { connect } from "../lib/connectLogic";

export const typeDefs = /* GraphQL */ `
  type Mutation {
    createConnection(userId: ID!): Boolean!
    removeConnection(userId: ID!): Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    createConnection: async (
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

    removeConnection: async (
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
