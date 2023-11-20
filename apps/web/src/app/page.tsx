"use client";

import { ProtectedPage } from "@/components/ProtectedPage";
import { useSaveTokensFromQueryParams } from "@/hooks/useSaveTokenFromParams";
import { Clock, Github } from "@/icons";
import { apiUrl, prod } from "@/lib/constants";
import { useTokenStore } from "@/stores/useTokenStore";
import { Button } from "@/ui/button";
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
        prefix={<Github width={16} height={16} />}
        onClick={() => {
          window.location.href = `${apiUrl}/auth/github`;
        }}
      >
        Login with Github
      </Button>
      {prod ? (
        <Button
          prefix={<Clock />}
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
          color="secondary"
        >
          Create test a user
        </Button>
      ) : null}
    </main>
  );
}
