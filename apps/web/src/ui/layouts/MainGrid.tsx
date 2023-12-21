"use client";
import { useScreenSize } from "~/hooks/useScreenSize";
import React from "react";

export type MainGridProps = {
  children: React.ReactNode;
  className?: string;
};

export const MainInnerGrid: React.FC<MainGridProps> = ({
  children,
  className = "",
}) => {
  const screenSize = useScreenSize();

  let gridTemplateColumns = "235px 640px 325px";
  let myClassName = ``;

  if (screenSize === "2-cols") {
    gridTemplateColumns = "60px 700px 60px";
  } else if (screenSize === "1-cols") {
    gridTemplateColumns = "60px 700px";
  } else if (screenSize === "fullscreen") {
    myClassName = "w-full px-3";
    gridTemplateColumns = "1fr";
  }

  return (
    <div
      id="main"
      className={`relative ${myClassName} ${className}`}
      style={{
        display: screenSize === "fullscreen" ? "flex" : "grid",
        gridTemplateColumns,
        columnGap: 60,
      }}
    >
      {children}
    </div>
  );
};

export const MainGrid: React.FC<MainGridProps> = ({ children }) => {
  return (
    <div className={`flex justify-center w-full min-h-screen bg-primary-fg`}>
      <MainInnerGrid>{children}</MainInnerGrid>
    </div>
  );
};
