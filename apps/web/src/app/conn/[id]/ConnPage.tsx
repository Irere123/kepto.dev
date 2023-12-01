"use client";

import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { ConnPageController } from "./ConnPageController";

export const ConnPage = ({ params }: { params: { id: string } }) => {
  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <ConnPageController connectionId={params.id} />
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
