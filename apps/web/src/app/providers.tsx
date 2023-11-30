"use client";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { SubscriptionContextProvider } from "@/contexts/SubscriptionContext";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

const client = new QueryClient();

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <SubscriptionContextProvider>{children}</SubscriptionContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};
