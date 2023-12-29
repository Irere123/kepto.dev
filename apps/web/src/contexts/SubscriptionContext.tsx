"use client";

import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Client } from "graphql-ws";
import { requestIdleCallback } from "next/dist/client/request-idle-callback";
import { useTokenStore } from "~/stores/useTokenStore";

export interface SubscriptionContextData {
  subscriptionClient: Client | null;
  connected: boolean;
}

const SubscriptionContext = React.createContext<SubscriptionContextData>({
  subscriptionClient: null,
  connected: false,
});

export default SubscriptionContext;

export type SubscriptionContextProviderProps = {
  children?: ReactNode;
};

export const SubscriptionContextProvider = ({
  children,
}: SubscriptionContextProviderProps): ReactElement => {
  const [connected, setConnected] = useState(false);
  const [subscriptionClient, setSubscriptionClient] = useState<Client | null>(
    null
  );

  useEffect(() => {
    if (!subscriptionClient) {
      requestIdleCallback(() => {
        import(
          /* webpackChunkName: "subscriptions" */ "../lib/subscriptionClient"
        ).then(({ createSubscriptionClient }) => {
          const client = createSubscriptionClient();
          setSubscriptionClient(client);
          client.on("connected", () => setConnected(true));
        });
      });
    }
  }, [subscriptionClient]);

  const contextData = useMemo<SubscriptionContextData>(
    () => ({
      connected,
      subscriptionClient,
    }),
    [connected, subscriptionClient]
  );

  return (
    <SubscriptionContext.Provider value={contextData}>
      {children}
    </SubscriptionContext.Provider>
  );
};
