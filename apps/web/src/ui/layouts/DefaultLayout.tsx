"use client";

import { LeftPanel } from "../panels";
import { MainLayout } from "./MainLayout";
import { ProtectedPage } from "./ProtectedPage";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedPage>
      <MainLayout leftPanel={<LeftPanel />}>{children}</MainLayout>
    </ProtectedPage>
  );
};

export default DefaultLayout;
