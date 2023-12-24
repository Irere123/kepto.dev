"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useTokenStore } from "~/stores/useTokenStore";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    useTokenStore.getState().setTokens({
      accessToken: "",
    });

    router.push("/");
  }, [router]);
  return null;
}
