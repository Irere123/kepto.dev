import React from "react";

const sizeClassNames = {
  small: "px-2 py-1",
  medium: "px-3 py-2",
  big: "px-4 py-3",
};

const colorClassNames = {
  primary: "bg-primary-accents-7 text-primary-bg",
  secondary:
    "border border-primary-accents-3 bg-primary-accents-1 text-primary-accents-7 hover:",
  error: "bg-error-light text-primary-bg",
  warning: "bg-warning text-primary-bg",
  tertiary: "bg-transparent text-primary-fg",
};

const shapeClassNames = {
  circle: "rounded-full",
  square: "rounded-md",
  rounded: "rounded-lg",
};

export type ButtonProps = {
  children?: React.ReactNode;
  size?: keyof typeof sizeClassNames;
  color?: keyof typeof colorClassNames;
  shape?: keyof typeof shapeClassNames;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  svgOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Button({
  size = "medium",
  children,
  prefix,
  color = "primary",
  shape = "square",
  suffix,
  loading,
  disabled,
  svgOnly = false,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`flex items-center gap-3 ${className} ${sizeClassNames[size]} ${colorClassNames[color]} ${shapeClassNames[shape]}`}
      disabled={loading || disabled}
      type="button"
      onClick={onClick}
    >
      {prefix && !svgOnly ? <span>{prefix}</span> : null}
      {children}
      {suffix && !svgOnly ? <span>{suffix}</span> : null}
      {loading && !svgOnly ? <p>loading...</p> : null}
    </button>
  );
}
