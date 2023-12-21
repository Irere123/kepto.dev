"use client";

import { useVerifyLoggedIn } from "~/hooks/useVerifyLoggedIn";
import React from "react";

interface ProtectedPageProps {
  children?: React.ReactNode;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  if (!useVerifyLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};
