import { ProtectedPage } from "@/components/ProtectedPage";
import { Text } from "@/ui/text";
import React from "react";

export default function DashBoardPage() {
  return (
    <ProtectedPage>
      <div>
        <Text transform="uppercase" as="h3" size="3xl">
          Dashboard page
        </Text>
      </div>
    </ProtectedPage>
  );
}
