"use client";

import { ProtectedPage } from "@/components/ProtectedPage";
import { useSaveTokensFromQueryParams } from "@/hooks/useSaveTokenFromParams";
import { Clock, Github } from "@/icons";
import { apiUrl } from "@/lib/constants";
import { Button } from "@/ui/button";

export default function Home() {
  useSaveTokensFromQueryParams();

  return (
    <ProtectedPage>
      <main className="flex w-96 justify-center m-auto items-center flex-col gap-3">
        <Button
          prefix={<Github width={16} height={16} />}
          onClick={() => {
            window.location.href = `${apiUrl}/auth/github`;
          }}
        >
          Login with Github
        </Button>
        <Button prefix={<Clock />} color="secondary">
          Create test a user
        </Button>
      </main>
    </ProtectedPage>
  );
}
