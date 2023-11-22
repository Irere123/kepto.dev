"use client";

import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { Text } from "@/ui/text";

interface Props {}

export const ChatPage: React.FC<Props> = () => {
  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div>
            <Text as="p">Hello world</Text>
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
