export const prod = process.env.NODE_ENV === "production";
export const isServer = typeof window === undefined;
export const apiUrl = prod ? "https://api.kepto.dev" : "http://localhost:4000";
export const graphqlUrl = `${apiUrl}/graphql`;
