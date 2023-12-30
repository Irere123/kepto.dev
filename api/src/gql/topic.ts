export const typeDefs = /* GraphQL */ `
  type Topic {
    id: ID!
    name: String!
    description: String!
    slug: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    topics: [Topic]
  }
`;

export const resolvers = {
  Query: {
    topics: () => [],
  },
};
