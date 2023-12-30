"use client";

import React from "react";
import { useQuery } from "react-query";
import { getConversation } from "@kepto/shared";

import { ConversationHeader } from "~/ui/conversation/conversation-header";
import { ConversationInput } from "~/ui/conversation/conversation-input";
import { ConversationMessages } from "~/ui/conversation/conversation-messages";
import { MainLayout } from "~/ui/layouts/MainLayout";

export const ConversationPageController: React.FC<{ convId: string }> = ({
  convId,
}) => {
  const { data, isLoading } = useQuery("getConversation", () =>
    getConversation(convId)
  );

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <MainLayout>
      <div className="flex flex-col">
        <ConversationHeader conversation={data?.conversation!} />
        <ConversationMessages conversationId={convId} />
        <ConversationInput conversationId={convId} />
      </div>
    </MainLayout>
  );
};
