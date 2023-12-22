"use client";

import { useTokenStore } from "~/stores/useTokenStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useVerifyLoggedIn = () => {
  const hasTokens = useTokenStore((x) => !!x.accessToken);
  const path = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (!hasTokens) {
      replace(`/?next=${path}`);
    }
  }, [hasTokens, path, replace]);

  return hasTokens;
};
