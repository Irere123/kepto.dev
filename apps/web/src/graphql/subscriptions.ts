"use client";
import { Client, createClient } from "graphql-ws";

import { wsUrl } from "~/lib/constants";

export function createSubscriptionClient(token: string): Client {
  return createClient({
    url: wsUrl,
    lazy: false,
    connectionParams: { token },
  });
}
