import React from "react";

export type StackProps = {
  gap?: number;
  column?: boolean;
  children?: React.ReactNode;
};

export const Stack: React.FC<StackProps> = ({ children, column, gap }) => {
  return (
    <div
      style={{ display: "flex", gap, flexDirection: column ? "column" : "row" }}
    >
      {children}
    </div>
  );
};
