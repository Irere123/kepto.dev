import { Badge, Button } from "@kepto/ui";
import Link from "next/link";
import { Suspense } from "react";
import { getGitHubStars } from "~/lib/github";
import { numberFormatter } from "~/lib/utils";

export function Hero() {
  return (
    <div className="my-10 flex w-full flex-col justify-center gap-1 px-3 py-4 text-center md:my-20 md:p-6">
      <div>
        <Badge variant="outline" className="backdrop-blur-[2px]">
          <Link
            href="https://github.com/Irere123/kepto.dev/stargazers"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            Proudly Open Source
          </Link>
        </Badge>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className={`text-primary-accents-8 text-4xl md:text-6xl`}>
          A better way to connect with developers.
        </h1>
        <p className="text-primary-accents-7 mx-auto max-w-md text-lg md:max-w-lg md:text-xl">
          Connect with your fellow developers around the world in an instant and
          gain knowledge and expertise from them.
        </p>
      </div>
      <div className="my-4 grid gap-2 sm:grid-cols-2">
        <div className="text-center sm:block sm:text-right">
          <Button className="w-48 rounded-full sm:w-auto" asChild>
            <Link href="/waitlist">Get Started</Link>
          </Button>
        </div>
        <div className="text-center sm:block sm:text-left">
          <Button
            variant="outline"
            className="w-48 rounded-full sm:w-auto"
            asChild
          >
            <Link href="/github" target="_blank">
              Star on GitHub{" "}
              <Suspense fallback={<StarsBadgeFallback />}>
                <StarsBadge />
              </Suspense>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function StarsBadgeFallback() {
  return <>~</>;
}

async function StarsBadge() {
  const stars = await getGitHubStars();

  return <>{numberFormatter(stars)}</>;
}
