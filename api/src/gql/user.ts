import { connections, db, eq, ne, user } from "@kepto/db";
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
    numConnections: Int!
    contributions: String
    createdAt: DateTime
    updateAt: DateTime
    youConnected: Boolean
  }

  type Query {
    me: User
    users: [User]
    getUser(id: ID!): User
  }
`;

export const resolvers = {
  User: {
    youConnected: async ({ id }: { id: string }) => {
      const conn = (
        await db
          .select()
          .from(connections)
          .where(eq(connections.connectorId, id))
      ).at(0);

      if (!conn) {
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
      return (await db.select().from(user).where(eq(user.id, id))).at(0);
    },
  },
};
