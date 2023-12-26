"use client";

import { Input } from "@kepto/ui";

interface ConversationInputProps {
  conversationId: string;
}

export const ConversationInput: React.FC<ConversationInputProps> = ({
  conversationId,
}) => {
  return (
    <div className="mb-4">
      <Input placeholder="send message" />
    </div>
  );
};
