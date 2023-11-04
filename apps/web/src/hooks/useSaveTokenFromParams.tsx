"use client";

import { useTokenStore } from "@/stores/useTokenStore";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSaveTokensFromQueryParams = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { push } = useRouter();

  useEffect(() => {
    if (typeof token === "string" && token) {
      useTokenStore.getState().setTokens({ accessToken: token });

      // push to next path (1msec is unnoticeable)
      setTimeout(() => push("/feed"), 100);
    }
  }, [token, push]);
};
