import { and, db, eq, follows, ne, or, user } from "@kepto/db";
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
    contributions: Int!
    numFollowers: Int!
    numFollowing: Int!
    updatedAt: DateTime!
    createdAt: DateTime!
    followInfo: FollowInfo!
  }

  type FollowInfo {
    youAreFollowing: Boolean
    followsYou: Boolean
  }

  type Query {
    me: User
    users: [User]
    user(id: ID!): User
  }

  type Subscription {
    hello: String
  }
`;

export const resolvers = {
  User: {
    followInfo: async ({ id }: { id: string }, _args: {}, ctx: GQLContext) => {
      const follow = await db
        .select()
        .from(follows)
        .where(
          or(
            and(eq(follows.followerId, ctx.user.id), eq(follows.userId, id)),
            and(eq(follows.userId, id), eq(follows.followerId, ctx.user.id))
          )
        );
      console.log(follow);
      console.log("The folllow is %o", follow);
      if (!follow.length) {
        return {
          youAreFollowing: false,
          followsYou: false,
        };
      }

      return { youAreFollowing: true, followsYou: false };
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
