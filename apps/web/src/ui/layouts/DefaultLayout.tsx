"use client";

import { LeftPanel } from "../panels";
import { MiddlePanel } from "./GridPanels";
import { MainLayout } from "./MainLayout";
import { ProtectedPage } from "./ProtectedPage";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedPage>
      <MainLayout leftPanel={<LeftPanel />}>
        <MiddlePanel>{children}</MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};

export default DefaultLayout;
