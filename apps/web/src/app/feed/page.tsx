import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { Text } from "@/ui/text";
import React from "react";

export default function DashBoardPage() {
  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div>
            <Text transform="uppercase" as="h3" size="3xl">
              Dashboard page
            </Text>
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
}
