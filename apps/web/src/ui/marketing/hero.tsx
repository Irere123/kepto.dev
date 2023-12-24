import Link from "next/link";

export function Hero() {
  return (
    <div className="my-10 flex w-full flex-col justify-center gap-1 px-3 py-4 text-center md:my-20 md:p-6">
      <div>
        <div className="backdrop-blur-[2px]">
          <Link
            href="https://github.com/Irere123/kepto.dev/stargazers"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            Proudly Open Source
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h1
          className={`
            text-foreground font-cal text-4xl md:text-6xl
            bg-gradient-to-tl from-[hsl(var(--muted))] from-0% to-[hsl(var(--foreground))] to-40% bg-clip-text text-transparent
            `}
        >
          Designed for developers.
        </h1>
        <p className="text-muted-foreground mx-auto max-w-md text-lg md:max-w-lg md:text-xl">
          Connect with your fellow developers around the world in an instant and
          gain knowledge and expertise from them.
        </p>
      </div>
      <div className="my-4 grid gap-2 sm:grid-cols-2">
        <div className="text-center sm:block sm:text-right">
          <button className="w-48 rounded-full sm:w-auto">
            <Link href="/app/sign-up">Get Started</Link>
          </button>
        </div>
        <div className="text-center sm:block sm:text-left">
          <button className="w-48 rounded-full sm:w-auto">
            <Link href="/github" target="_blank">
              Star on GitHub{" "}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
