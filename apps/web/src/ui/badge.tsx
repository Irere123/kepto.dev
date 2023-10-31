import React from "react";

const sizeClassNames = {
  small: "px-2 py-1 text-xs",
  medium: "px-3 py-1 text-sm",
  big: "px-3 py-1 text-md",
};

const variantClassNames = {
  gray: "bg-primary-accents-6",
  "gray-subtle": "bg-primary-accents-3 text-primary-accents-7",
  blue: "bg-success text-primary-accents-2",
  "blue-subtle": "bg-success-light text-success-dark",
  amber: "bg-warning text-primary-warning-dark",
};

export type BadgeProps = {
  children?: React.ReactNode;
  size?: keyof typeof sizeClassNames;
  variant?: keyof typeof variantClassNames;
  preffix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "blue",
  size = "small",
  preffix,
  suffix,
}) => {
  return (
    <div
      className={`flex items-center rounded-full gap-2 font-bold ${variantClassNames[variant]} ${sizeClassNames[size]}`}
    >
      {preffix ? <span>{preffix}</span> : null}
      <span>{children}</span>
      {suffix ? <span>{suffix}</span> : null}
    </div>
  );
};
