"use client";

import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { ConnPageController } from "./ConnPageController";

export const ConnPage = () => {
  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <ConnPageController />
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
