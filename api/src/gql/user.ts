import { and, connections, db, eq, ne, user } from "@kepto/db";
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
    online: String!
    staff: String
    numConnections: Int!
    contributions: String
    updatedAt: DateTime!
    createdAt: DateTime!
    youConnected: Boolean!
  }

  type Query {
    me: User
    users: [User]
    getUser(id: ID!): User
  }

  type Subscription {
    hello: String
  }
`;

export const resolvers = {
  User: {
    youConnected: async (
      { id }: { id: string },
      _args: {},
      ctx: GQLContext
    ) => {
      const conn = await db
        .select()
        .from(connections)
        .where(
          and(
            eq(connections.connectorId, ctx.user.id),
            eq(connections.connecteeId, id)
          )
        );

      if (!conn[0]) {
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
    getUser: async (_parent: unknown, { id }: { id: string }) => {
      const u = await db.select().from(user).where(eq(user.id, id));

      return u[0];
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
