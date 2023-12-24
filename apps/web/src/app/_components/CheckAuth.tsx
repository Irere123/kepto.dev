"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSaveTokensFromQueryParams } from "~/hooks/useSaveTokenFromParams";
import { useTokenStore } from "~/stores/useTokenStore";

export function CheckAuth({ children }: { children: React.ReactNode }) {
  useSaveTokensFromQueryParams();
  const { push } = useRouter();
  const hasTokens = useTokenStore((t) => !!t.accessToken);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    if (hasTokens) {
      push("/feed");
    } else {
      setTokenChecked(true);
    }
  }, [push, hasTokens]);

  if (!tokenChecked) return null;

  return <>{children}</>;
}
