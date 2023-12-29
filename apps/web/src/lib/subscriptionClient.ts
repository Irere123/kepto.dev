import { wsUrl } from "@kepto/shared";

import { Client, createClient } from "graphql-ws";

export function createSubscriptionClient(): Client {
  return createClient({
    url: wsUrl,
    lazy: true,
  });
}
