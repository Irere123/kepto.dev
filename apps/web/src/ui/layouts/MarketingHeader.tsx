import { Button } from "@kepto/ui";
import Link from "next/link";

interface Props {
  className?: string;
}

export function MarketingHeader({ className }: Props) {
  return (
    <header
      className={`grid w-full grid-cols-2 gap-2 sm:grid-cols-5 ${className}`}
    >
      <div className="flex items-center sm:col-span-1">
        <Link
          href="/"
          className="text-2xl font-bold text-primary-accents-8 hover:text-primary-accents-7"
        >
          Kepto
        </Link>
      </div>
      <div className="hidden items-center justify-center sm:col-span-3 sm:flex sm:gap-3">
        <Button variant="link" asChild>
          <Link href="/blog">Blog</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/changelog">Changelog</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/docs">Docs</Link>
        </Button>
      </div>
      <div className="flex items-center justify-end gap-3 sm:col-span-1">
        <Button asChild className="rounded-full text-primary-bg">
          <Link href="/auth/login">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}
