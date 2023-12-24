"use client";

import { Button } from "@kepto/ui";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div>
      <h2 className="text-primary-fg">Something went wrong!</h2>
      <Button text="Try again" onClick={() => reset()} />
    </div>
  );
}
