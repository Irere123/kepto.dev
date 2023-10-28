import React from "react";

export interface ButtonProps {
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = () => {
  return (
    <button>
      <p>Hello world</p>
    </button>
  );
};
