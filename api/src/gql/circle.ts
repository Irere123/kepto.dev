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
    circle(slug: String!): Circle
  }

  type CreateCircleResponse {
    circle: Circle
    errors: [FieldError]
  }

  input CreateCircleInput {
    name: String!
    description: String
  }

  type Mutation {
    createCircle(input: CreateCircleInput!): CreateCircleResponse!
  }
`;

export const resolvers = {
  Mutation: {
    createCircle: async (
      _parent: unknown,
      { input }: { input: { name: string; description: string } },
      ctx: GQLContext
    ) => {
      if (!ctx.user) {
        throw new GraphQLError("Not authenticated");
      }

      const slug = input.name.split(" ").join("_").toLowerCase();

      let circ = await db.select().from(circle).where(eq(circle.slug, slug));

      console.log(circ);
      if (circ[0]) {
        return {
          errors: [
            {
              message: "Circle with that name already exists",
              field: "name",
            },
          ],
        };
      }

      const cir = await db
        .insert(circle)
        .values({
          description: input.description,
          name: input.name,
          ownerId: ctx.user.id,
          slug,
        })
        .returning();

      return {
        circle: cir[0],
        errors: null,
      };
    },
  },
  Query: {
    circles: async () => await db.select().from(circle),
    circle: async (
      _parent: unknown,
      { slug }: { slug: string },
      _ctx: GQLContext
    ) => {
      const circ = await db.select().from(circle).where(eq(circle.slug, slug));

      return circ[0];
    },
  },
};
