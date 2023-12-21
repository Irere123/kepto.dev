"use client";
import { Button } from "@kepto/ui";
import { MiddlePanel } from "~/ui/layouts/GridPanels";
import { MainLayout } from "~/ui/layouts/MainLayout";
import { ProtectedPage } from "~/ui/layouts/ProtectedPage";

interface Props {}

export const ChatPage: React.FC<Props> = () => {
  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div className="mt-4">
            <Button text="Create" variant="danger" />
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
