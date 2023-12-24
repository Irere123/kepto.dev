import * as React from "react";

import { cn } from "./utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "border-primary-accents-2 ring-offset-primary-accents-4 placeholder:text-primary-accents-5 focus-visible:ring-primary-accents-6 flex h-10 w-full rounded-md border bg-primary-bg px-3 py-2 text-sm text-primary-accents-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);

export { Input };
