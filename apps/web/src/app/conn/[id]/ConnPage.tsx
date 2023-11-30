"use client";

import { LeftPanel, MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { Text } from "@/ui/text";
import { useState } from "react";

export const ConnPage = () => {
  const [message, setMessage] = useState("");

  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div className="flex flex-1 flex-col h-full w-full">
            <div className="flex flex-1">
              <Text as="h1">Message</Text>
            </div>
            <form>
              <Text as="p">Hello world</Text>
              <input
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="placeholder:text-primary-fg"
                placeholder="enter the message"
              />
            </form>
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
