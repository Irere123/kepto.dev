"use client";

import AuthContext from "@/contexts/AuthContext";
import { useVerifyLoggedIn } from "@/hooks/useVerifyLoggedIn";
import { useTokenStore } from "@/stores/useTokenStore";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

interface ProtectedPageProps {
  children?: React.ReactNode;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  if (!useVerifyLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};
