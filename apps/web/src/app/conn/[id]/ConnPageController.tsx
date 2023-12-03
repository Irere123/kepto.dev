"use client";

import React from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessages } from "./chat/ChatMessages";
import { useQuery } from "react-query";
import { getConnection } from "@/graphql/connection";
import { Text } from "@/ui/text";

interface ConnPageControllerProps {
  connectionId: string;
}

export const ConnPageController: React.FC<ConnPageControllerProps> = ({
  connectionId,
}) => {
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      <ChatMessages connectionId={connectionId} />
      <ChatInput connectionId={connectionId} />
    </div>
  );
};
