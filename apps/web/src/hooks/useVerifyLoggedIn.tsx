"use client";

import { tree } from "next/dist/build/templates/app-page";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import AuthContext from "~/contexts/AuthContext";

export const useVerifyLoggedIn = () => {
  const path = usePathname();
  const { user } = useContext(AuthContext);
  const { replace } = useRouter();
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      replace(`/?next=${path}`);
    } else {
      setUserChecked(true);
    }
  }, [user, path, replace]);

  if (!userChecked) return null;

  return true;
};
