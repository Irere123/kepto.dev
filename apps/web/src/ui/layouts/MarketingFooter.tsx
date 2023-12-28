import Link from "next/link";

interface Props {
  className?: string;
}

export function MarketingFooter({ className }: Props) {
  return (
    <footer className={`w-full ${className}`}>
      <div className="border-border w-full rounded-lg border px-3 py-4 backdrop-blur-[2px] md:p-6 grid gap-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="order-4 flex flex-col justify-between gap-3 md:order-1"></div>
          <div className="order-1 flex flex-col gap-3 text-sm md:order-2">
            <p className="text-foreground font-semibold">Community</p>
            <FooterLink href="/github" label="GitHub" />
            <FooterLink href="/twitter" label="X" />
          </div>
          <div className="order-2 flex flex-col gap-3 text-sm md:order-3">
            <p className="text-foreground font-semibold">Resources</p>
            <FooterLink href="/blog" label="Blog" />
            <FooterLink href="/changelog" label="Changelog" />
            <FooterLink href="https://kepto-docs.vercel.app" label="Docs" />
          </div>
          <div className="order-3 flex flex-col gap-3 text-sm md:order-4">
            <p className="text-foreground font-semibold">Legal</p>
            <FooterLink href="/legal/terms" label="Terms" />
            <FooterLink href="/legal/privacy" label="Privacy" />
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

function FooterLink({ href, label, external = false }: FooterLinkProps) {
  const isExternal = external || href.startsWith("http");

  const LinkSlot = isExternal ? "a" : Link;

  const externalProps = isExternal
    ? {
        target: "_blank",
        rel: "noreferrer",
      }
    : {};

  return (
    <LinkSlot
      className="text-muted-foreground hover:text-foreground inline-flex items-center underline underline-offset-4 hover:no-underline"
      href={href}
      {...externalProps}
    >
      {label}
      {isExternal ? null : null}
    </LinkSlot>
  );
}
