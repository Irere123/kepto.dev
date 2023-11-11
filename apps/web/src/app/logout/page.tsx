"use client";
import { useTokenStore } from "@/stores/useTokenStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
