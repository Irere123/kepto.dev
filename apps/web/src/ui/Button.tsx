import React from "react";

const sizeClassNames = {
  small: "",
  medium: "px-3 py-2",
  big: "",
};

const typeClassNames = {
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

export interface ButtonProps {
  children?: React.ReactNode;
  size?: keyof typeof sizeClassNames;
  type?: keyof typeof typeClassNames;
  shape?: keyof typeof shapeClassNames;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = "medium",
  children,
  type = "secondary",
  prefix,
  shape = "square",
  suffix,
  loading,
}) => {
  return (
    <button
      className={`${sizeClassNames[size]} ${typeClassNames[type]} ${shapeClassNames[shape]}`}
    >
      {children}
    </button>
  );
};
