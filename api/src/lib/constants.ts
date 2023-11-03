export const prod = process.env.NODE_ENV === "production";
export const baseUrl = prod
  ? "https://keptoapi.fly.app"
  : "http://localhost:4000";

export const webUrl = prod ? "https://kepto.dev" : "http://localhost:4000";
