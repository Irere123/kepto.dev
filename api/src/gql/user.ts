import { and, connections, db, eq, ne, user } from "@kepto/db";
import { GQLContext } from "../lib/types";
import { GraphQLError } from "graphql";

export const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    username: String!
    displayName: String!
    avatarUrl: String!
    bio: String
    location: String
    email: String
    online: String!
    staff: String
    lastOnline: DateTime!
    contributions: Int!
    numConnections: Int!
    numConnectors: Int!
    youAreConnected: Boolean!
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type Query {
    me: User
    users: [User]
    user(id: ID!): User
    searchUser(usernameOrEmail: String): [User]
  }

  type Subscription {
    hello: String
  }
`;

export const resolvers = {
  User: {
    lastOnline: (_parent: unknown, _args: {}, ctx: GQLContext) => {
      return ctx.req.session.lastRequest;
    },
    youAreConnected: async (
      { id }: { id: string },
      _args: {},
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        return false;
      }

      const us = await db
        .select()
        .from(connections)
        .where(
          and(
            eq(connections.userId, id),
            eq(connections.connectorId, ctx.user.id)
          )
        );
      if (!us[0]) {
        return false;
      }

      return true;
    },
  },
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
    user: async (_parent: unknown, { id }: { id: string }) => {
      const u = await db.select().from(user).where(eq(user.id, id));

      return u[0];
    },
    searchUser: async (
      _parent: unknown,
      { usernameOrEmail }: { usernameOrEmail: string },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authenticated");
      }

      const emailPattern = /^\S+@\S+\.\S+$/;
      let res;

      if (emailPattern.test(usernameOrEmail)) {
        res = await db
          .select()
          .from(user)
          .where(eq(user.email, usernameOrEmail))
          .limit(10);
      }

      res = await db
        .select()
        .from(user)
        .where(eq(user.username, usernameOrEmail))
        .limit(10);

      return res;
    },
  },
  Subscription: {
    hello: {
      // Example using an async generator
      subscribe: async function* () {
        for await (const word of ["Hello", "Bonjour", "Ciao"]) {
          yield { hello: word };
        }
      },
    },
  },
};
