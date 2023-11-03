export const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    username: String
    displayName: String
    createdAt: DateTime
    updateAt: DateTime
  }

  type Query {
    users: [User]
  }
`;

export const resolvers = {
  Query: {
    users: () => [],
  },
};
