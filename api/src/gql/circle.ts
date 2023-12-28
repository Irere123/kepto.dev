import { GraphQLError } from "graphql";
import { GQLContext } from "../lib/types";
import { circle, db, eq } from "@kepto/db";

export const typeDefs = /* GraphQL */ `
  type Circle {
    id: ID!
    name: String!
    description: String!
    slug: String!
    creatorId: ID
    website: String
    members: [User]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    circles: [Circle]!
    circle(id: ID!): Circle
  }

  input CreateCircleInput {
    name: String!
    description: String
  }

  type Mutation {
    createCircle(data: CreateCircleInput!): Circle!
  }
`;

export const resolvers = {
  Mutation: {
    createCircle: async (
      _parent: unknown,
      { data }: { data: { name: string; description: string } },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authenticated");
      }

      const cir = await db
        .insert(circle)
        .values({
          description: data.description,
          name: data.name,
          ownerId: ctx.user.id,
          slug: data.name.split(" ").join("_").toLowerCase(),
        })
        .returning();

      return cir[0];
    },
  },
  Query: {
    circles: async () => await db.select().from(circle),
    circle: async (
      _parent: unknown,
      { id }: { id: string },
      _ctx: GQLContext
    ) => {
      const circ = await db.select().from(circle).where(eq(circle.id, id));

      return circ[0];
    },
  },
};
