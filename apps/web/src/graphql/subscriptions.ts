"use client";
import { wsUrl } from "@/lib/constants";
import { Client, createClient } from "graphql-ws";

export function createSubscriptionClient(token: string): Client {
  return createClient({
    url: wsUrl,
    lazy: false,
    connectionParams: { token },
  });
}
