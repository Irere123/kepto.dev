import React from "react";

const sizeClassNames = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

const fontWeightMap = {
  "100": "font-thin",
  "200": "font-extralight",
  "300": "font-light",
  "400": "font-normal",
  "500": "font-medium",
  "600": "font-sembold",
  "700": "font-bold",
  "800": "font-extrabold",
  "900": "font-black",
};

type As =
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "strong"
  | "p";

type Transform = "uppercase" | "lowercase" | "capitalize" | "initial" | "none";

export interface TextProps {
  size?: keyof typeof sizeClassNames;
  as?: As;
  transform?: Transform;
  weight?: keyof typeof fontWeightMap;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = "base",
  as = "div",
  weight = "400",
  transform = "initial",
}) => {
  const Element = as;

  return (
    <Element
      className={`text-primary-fg ${transform} ${sizeClassNames[size]} ${fontWeightMap[weight]}`}
    >
      {children}
    </Element>
  );
};
