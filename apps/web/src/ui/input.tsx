import React, { forwardRef } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, textarea, transparent, error, ...props }, ref) => {
    const bg = transparent ? "bg-transparent" : "bg-primary-accents-1";
    const ring = error ? "ring ring-primary-accents-7" : "";
    const cn = `w-full px-3 py-2 focus:outline-none focus:ring focus:ring-primary-accents-6 rounded-md text-primary-accents-7 ${bg} ${ring} ${className}`;
    return textarea ? (
      <textarea ref={ref as any} className={cn} {...(props as any)} />
    ) : (
      <input className={cn} ref={ref} {...props} />
    );
  }
);

Input.displayName = "Input";
