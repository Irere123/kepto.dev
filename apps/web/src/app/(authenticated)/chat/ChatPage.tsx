"use client";
import { Button } from "@kepto/ui";
import { MiddlePanel } from "~/ui/layouts/GridPanels";
import { useCreateConvModal } from "~/ui/modals/create-conversation-modal";
import { MainLayout } from "~/ui/layouts/MainLayout";
import { ProtectedPage } from "~/ui/layouts/ProtectedPage";
import { useContext } from "react";
import { ModalContext } from "~/ui/modals/provider";

interface Props {}

export const ChatPage: React.FC<Props> = () => {
  const { CreateConvModal } = useCreateConvModal();
  const { setShowCreateConvModal } = useContext(ModalContext);

  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div className="mt-4">
            <Button onClick={() => setShowCreateConvModal(true)}>Create</Button>
            <CreateConvModal />
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
