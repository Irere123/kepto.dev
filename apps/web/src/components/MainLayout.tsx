"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import React from "react";
import { MainInnerGrid } from "./MainGrid";

interface MainLayoutProps {
  children: React.ReactNode;
  tabletSidebar?: React.ReactNode;
  rightPanel?: React.ReactNode;
  leftPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
  tabletSidebar = <div />,
}) => {
  const screenSize = useScreenSize();

  let middle = null;

  switch (screenSize) {
    case "3-cols":
      middle = (
        <>
          {leftPanel}
          {children}
          {rightPanel}
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          {tabletSidebar}
          {children}
          {rightPanel}
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          {tabletSidebar}
          {children}
        </>
      );
      break;
    case "fullscreen":
      middle = <>{children}</>;
      break;
    default:
      break;
  }
  return (
    <div
      className={`flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-accents-2`}
    >
      <MainInnerGrid>{middle}</MainInnerGrid>
    </div>
  );
};
