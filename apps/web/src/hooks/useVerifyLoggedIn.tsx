"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import AuthContext from "~/contexts/AuthContext";

export const useVerifyLoggedIn = () => {
  const path = usePathname();
  const { user } = useContext(AuthContext);
  const { replace } = useRouter();

  useEffect(() => {
    if (!user) {
      replace(`/?next=${path}`);
    }
  }, [user, path, replace]);

  return true;
};
