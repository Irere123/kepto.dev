"use client";

import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import AuthContext from "~/contexts/AuthContext";

export function CheckAuth({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext);
  const { replace } = useRouter();

  if (user) {
    replace("/feed");
  }

  return <>{children}</>;
}
