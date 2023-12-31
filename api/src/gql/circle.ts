import { GraphQLError } from "graphql";
import { GQLContext } from "../lib/types";
import { circle, circleMember, db, eq, sql } from "@kepto/db";

export const typeDefs = /* GraphQL */ `
  """
  Circle object that represents the DB model
  """
  type Circle {
    id: ID!
    name: String!
    description: String!
    slug: String!
    creatorId: ID
    membersCount: Int!
    website: String
    members: [CircleMember!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type CircleMember {
    id: ID!
    displayName: String!
    avatarUrl: String!
    username: String!
    admin: Boolean!
    bio: String
    moderator: Boolean!
    circleId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    circles(limit: Int!): [Circle]!
    userCirclesList: [Circle!]
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
  Circle: {
    membersCount: async ({ id }: { id: string }) => {
      let members = await db.execute(
        sql`select id from circle_members as m where m."circleId" = ${id}`
      );

      return members.rowCount;
    },
    members: async ({ id }: { id: string }) => {
      const members = await db.execute(sql`
        select cm."circleId", cm."admin", cm."moderator", u."id", u."avatarUrl", 
        u."displayName", u."bio", u."username", cm."createdAt", cm."updatedAt"
        from circle_members as cm inner join users as u on u."id" = cm."userId"
        where cm."circleId" =  ${id} order by cm."createdAt" desc
       `);
      return members.rows;
    },
  },
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

      let cir;

      await db.transaction(async (tx) => {
        cir = await tx
          .insert(circle)
          .values({
            description: input.description,
            name: input.name,
            ownerId: ctx.user.id,
            slug,
          })
          .returning();

        await tx.insert(circleMember).values({
          circleId: cir[0].id,
          userId: ctx.user.id,
          admin: true,
          moderator: true,
        });
      });

      return {
        circle: cir![0],
        errors: null,
      };
    },
  },
  Query: {
    circles: async (_parent: unknown, { limit }: { limit: number }) =>
      await db.select().from(circle).limit(limit),
    circle: async (
      _parent: unknown,
      { slug }: { slug: string },
      _ctx: GQLContext
    ) => {
      const circ = await db.select().from(circle).where(eq(circle.slug, slug));

      return circ[0];
    },
    userCirclesList: async (_parent: unknown, _args: {}, ctx: GQLContext) => {
      if (!ctx.user) {
        return null;
      }

      const circles = await db.execute(sql`
      select * from circles as c inner join circle_members as cm on c."id" = cm."circleId"
      where cm."userId" = ${ctx.user.id}
      `);

      return circles.rows;
    },
  },
};
