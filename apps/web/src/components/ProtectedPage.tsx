"use client";

import AuthContext from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

interface ProtectedPageProps {
  children?: React.ReactNode;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if(user){
        push("/feed");
    }
  }, [push, user]);
  return <>{children}</>;
};
