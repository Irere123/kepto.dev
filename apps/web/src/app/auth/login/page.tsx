"use client";

import { Clock, Github, Button } from "@kepto/ui";
import { apiUrl, isProd } from "@kepto/shared";

import { useSaveTokensFromQueryParams } from "~/hooks/useSaveTokenFromParams";
import { useTokenStore } from "~/stores/useTokenStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
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

  return (
    <main className="flex w-96 justify-center m-auto items-center flex-col gap-3">
      <Button
        onClick={() => {
          window.location.href = `${apiUrl}/auth/github`;
        }}
      >
        <Github width={16} height={16} className="mr-2" />
        Login with Github
      </Button>
      {!isProd ? (
        <Button
          variant="secondary"
          onClick={async () => {
            const name = window.prompt("username");
            if (!name) {
              return;
            }
            const r = await fetch(`${apiUrl}/dev/test-user?username=` + name);
            const d = await r.json();
            useTokenStore.getState().setTokens({
              accessToken: d.token,
            });
            push("/feed");
          }}
        >
          <Clock />
          Create test a user
        </Button>
      ) : null}
    </main>
  );
}
