import * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "./utils/cn";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary-fg hover:bg-primary-fg/80 border-transparent text-primary-accents-7",
        secondary:
          "bg-primary-accents-1 hover:bg-primary-accents-1/80 border-primary-accents-2 text-primary-accents-8",
        destructive:
          "bg-error hover:bg-error/80 border-transparent text-error-accents-3",
        outline: "text-primary-accents-3 border-primary-accents-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
