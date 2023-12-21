"use client";

import { useScreenSize } from "~/hooks/useScreenSize";
import React from "react";
import { MainInnerGrid } from "./MainGrid";
import { LeftPanel } from "./GridPanels";

interface MainLayoutProps {
  children: React.ReactNode;
  tabletSidebar?: React.ReactNode;
  rightPanel?: React.ReactNode;
  leftPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  tabletSidebar = <div />,
}) => {
  const screenSize = useScreenSize();

  let middle = null;
  let prepend = null;

  switch (screenSize) {
    case "3-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          <LeftPanel>{tabletSidebar}</LeftPanel>
          {children}
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          <LeftPanel>{tabletSidebar}</LeftPanel>
          {children}
        </>
      );
      break;
    case "fullscreen":
      prepend = <></>;
      middle = <>{children}</>;
  }

  return (
    <>
      <div className={`fixed left-0 w-full z-10`} style={{ top: 0 }}>
        {prepend}
      </div>
      <div
        className={`flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-2 ${
          prepend ? "mt-8 mb-7" : ""
        }`}
      >
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
