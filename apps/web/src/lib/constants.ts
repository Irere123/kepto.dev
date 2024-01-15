export const prod = process.env.NODE_ENV === "production";
export const isServer = typeof window === undefined;
export const apiUrl = prod
  ? "https://kepto.onrender.com"
  : "http://localhost:4000";
export const graphqlUrl = `${apiUrl}/graphql`;
export const wsUrl = !prod
  ? `ws://localhost:4000/graphql`
  : `wss://kepto.onrender.com/graphql`;
