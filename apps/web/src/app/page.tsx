"use client";

import { Clock, Emoji, Github } from "@/icons";
import { Button } from "@/ui/button";

export default function Home() {
  return (
    <main className="flex w-96 justify-center m-auto items-center flex-col gap-3">
      <Button prefix={<Github width={16} height={16} />}>
        Login with Github
      </Button>
      <Button prefix={<Clock />} color="secondary">
        Create test a user
      </Button>
    </main>
  );
}
