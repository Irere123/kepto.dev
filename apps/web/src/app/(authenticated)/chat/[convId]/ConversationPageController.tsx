"use client";

import React from "react";
import { ConversationHeader } from "~/ui/conversation/conversation-header";
import { ConversationInput } from "~/ui/conversation/conversation-input";
import { ConversationMessages } from "~/ui/conversation/conversation-messages";
import { MainLayout } from "~/ui/layouts/MainLayout";

export const ConversationPageController: React.FC<{ convId: string }> = ({
  convId,
}) => {
  return (
    <MainLayout>
      <div className="flex flex-col">
        <ConversationHeader conversationId={convId} />
        <ConversationMessages conversationId={convId} />
        <ConversationInput conversationId={convId} />
      </div>
    </MainLayout>
  );
};
