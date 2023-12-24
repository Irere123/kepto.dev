import { MarketingHeader } from "./MarketingHeader";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-6 p-4 md:p-8">
      <MarketingHeader className="mx-auto w-full max-w-4xl" />
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-start justify-center">
        {children}
      </div>
    </main>
  );
}
