export const prod = process.env.NODE_ENV === "production";
export const baseUrl = prod
  ? "https://kepto.onrender.com"
  : "http://localhost:4000";

export const webUrl = prod
  ? "https://kepto.vercel.app"
  : "http://localhost:3000";
