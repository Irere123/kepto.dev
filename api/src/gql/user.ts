import { db, ne, user } from "@kepto/db";
import { GQLContext } from "../lib/types";

export const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    username: String!
    displayName: String!
    avatarUrl: String!
    bio: String
    location: String
    email: String
    online: String
    staff: String
    contributions: String
    createdAt: DateTime
    updateAt: DateTime
    githubAccessToken: String
  }

  type Query {
    me: User
    users: [User]
  }
`;

export const resolvers = {
  Query: {
    me: (_parent: unknown, _args: {}, ctx: GQLContext) => {
      return ctx.user;
    },
    users: async (_parent: unknown, _args: {}, ctx: GQLContext) => {
      const users = await db
        .select()
        .from(user)
        .where(ne(user.id, ctx.user.id));

      return users;
    },
  },
};
