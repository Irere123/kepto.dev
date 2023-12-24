interface Props {
  className?: string;
}

export function MarketingHeader({ className }: Props) {
  return (
    <header
      className={`grid w-full grid-cols-2 gap-2 sm:grid-cols-5 ${className}`}
    >
      <div className="flex items-center sm:col-span-1">
        <h2 className="text-xl">Kepto</h2>
      </div>
      <div className="hidden items-center justify-center sm:col-span-3 sm:flex sm:gap-3">
        <p>Blog</p>
        <p>Changelog</p>
        <p>Docs</p>
      </div>
      <div className="flex items-center justify-end gap-3 sm:col-span-1">
        <p>Sign up</p>
      </div>
    </header>
  );
}
