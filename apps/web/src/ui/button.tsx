import React from "react";

const sizeClassNames = {
  small: "",
  medium: "px-3 py-2",
  big: "",
};

const colorClassNames = {
  secondary: "border border-gray-400",
  error: "bg-red-400",
  warning: "bg-yellow-500",
  tertiary: "bg-transparent",
};

const shapeClassNames = {
  circle: "",
  square: "rounded",
  rounded: "rounded-md",
};

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children?: React.ReactNode;
  size?: keyof typeof sizeClassNames;
  color?: keyof typeof colorClassNames;
  shape?: keyof typeof shapeClassNames;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
};

export function Button({
  size = "medium",
  children,
  prefix,
  color = "secondary",
  shape = "square",
  suffix,
  loading,
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${sizeClassNames[size]} ${colorClassNames[color]} ${shapeClassNames[shape]}`}
      disabled={loading || disabled}
      type="button"
      {...props}
    >
      {prefix ? <span>{prefix}</span> : null}
      {children}
      {suffix ? <span>{suffix}</span> : null}
      {loading ? <p>loading...</p> : null}
    </button>
  );
}
