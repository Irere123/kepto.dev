export const isProd = process.env.NODE_ENV === "production";
export const isServer = typeof window === undefined;
export const apiUrl = isProd
  ? "https://kepto.onrender.com"
  : "http://localhost:4000";
export const webUrl = isProd
  ? "https://kepto.vercel.app"
  : "http://localhost:3000";

export const graphqlUrl = `${apiUrl}/graphql`;
export const wsUrl = !isProd
  ? `ws://localhost:4000/graphql`
  : `ws://kepto.onrender.com/graphql`;
