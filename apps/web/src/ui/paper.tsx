import React from "react";

export type PaperProps = {
  children: React.ReactNode;
  border?: boolean;
  transparent?: boolean;
};

export const Paper: React.FC<PaperProps> = ({
  children,
  border = true,
  transparent = false,
}) => {
  return (
    <div
      className={`px-3 py-2 ${
        border && "border border-primary-accents-2"
      } rounded-md ${
        !transparent
          ? "bg-primary-accents-1"
          : "border-b border-primary-accents-2"
      }`}
    >
      {children}
    </div>
  );
};
