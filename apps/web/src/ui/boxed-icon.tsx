"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@kepto/ui";
import React from "react";

const variantStyles = {
  default: "rounded-sm ",
  rounded: "rounded-full",
};

interface BoxedIconProps {
  children?: React.ReactNode;
  variant?: keyof typeof variantStyles;
  name?: string;
  tooltipSide?: "left" | "right" | "top" | "bottom";
}

export const BoxedIcon: React.FC<BoxedIconProps> = ({
  children,
  variant = "default",
  name,
  tooltipSide = "right",
}) => {
  return (
    <Tooltip>
      <TooltipTrigger
        className={`flex justify-center items-center bg-muted w-10 h-10 ${variantStyles[variant]}`}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side={tooltipSide}>{name}</TooltipContent>
    </Tooltip>
  );
};
