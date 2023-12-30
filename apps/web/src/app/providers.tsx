"use client";

import { TooltipProvider } from "@kepto/ui";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthContextProvider } from "~/contexts/AuthContext";
import { SharedDataContextProvider } from "~/contexts/SharedDataContext";
import { SubscriptionContextProvider } from "~/contexts/SubscriptionContext";
import ModalProvider from "~/ui/modals/provider";

interface ProvidersProps {
  children: React.ReactNode;
}

const client = new QueryClient();

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <SubscriptionContextProvider>
          <SharedDataContextProvider>
            <TooltipProvider>
              <ModalProvider>{children}</ModalProvider>
            </TooltipProvider>
          </SharedDataContextProvider>
        </SubscriptionContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};
