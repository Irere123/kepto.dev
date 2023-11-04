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
    users: () => [],
  },
};
