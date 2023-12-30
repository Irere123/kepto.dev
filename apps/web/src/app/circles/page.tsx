import { Metadata } from "next";

import { MainLayout } from "~/ui/layouts/MainLayout";
import { CirclesController } from "./CirclesController";
import { LeftPanel } from "~/ui/panels";

export const metadata: Metadata = {
  title: "Explore",
};

export default function CirclesPage() {
  return (
    <MainLayout leftPanel={<LeftPanel />}>
      <CirclesController />
    </MainLayout>
  );
}
