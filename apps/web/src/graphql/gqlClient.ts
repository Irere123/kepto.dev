import { apiUrl } from "@/lib/constants";
import { useTokenStore } from "@/stores/useTokenStore";
import { GraphQLClient } from "graphql-request";

const token = useTokenStore.getState().accessToken;

export const gqlClient = new GraphQLClient(`${apiUrl}/graphql`, {
  headers: { authorization: `Bearer ${token}` },
});
