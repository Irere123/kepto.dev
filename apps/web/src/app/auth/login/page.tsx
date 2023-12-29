"use client";

import { Clock, Github, Button } from "@kepto/ui";
import { apiUrl, isProd, webUrl } from "@kepto/shared";

import { useTokenStore } from "~/stores/useTokenStore";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthContext from "~/contexts/AuthContext";

export default function Home() {
  const { push } = useRouter();
  const { user } = useContext(AuthContext);

  if (user) {
    push("/feed");
  }

  return (
    <main className="flex w-96 justify-center m-auto items-center flex-col gap-3">
      <Button
        onClick={() => {
          window.location.href = `${apiUrl}/auth/github?r=${webUrl}/feed`;
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

            await fetch(`${apiUrl}/dev/test-user?username=` + name, {
              method: "POST",
              mode: "no-cors",
              credentials: "include",
            });
          }}
        >
          <Clock />
          Create test a user
        </Button>
      ) : null}
    </main>
  );
}
