"use client";

import { isServer } from "@/lib/constants";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const accessTokenKey = "@kepto/token";

const getDefaultValues = () => {
  if (!isServer) {
    try {
      return {
        accessToken: localStorage.getItem(accessTokenKey),
      };
    } catch {}
  }

  return {
    accessToken: "",
  };
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setTokens: (x: { accessToken: string }) => {
      localStorage.setItem(accessTokenKey, x.accessToken);
      set(x);
    },
  }))
);
