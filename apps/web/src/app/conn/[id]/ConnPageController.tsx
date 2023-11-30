"use client";

import React from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessages } from "./chat/ChatMessages";

interface ConnPageControllerProps {}

export const ConnPageController: React.FC<ConnPageControllerProps> = () => {
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      <ChatMessages />
      <ChatInput />
    </div>
  );
};
