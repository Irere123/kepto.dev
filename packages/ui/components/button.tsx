import React from "react";

export interface ButtonProps {
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className="bg-slate-800">{children}</button>;
};
