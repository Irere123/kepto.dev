"use client";

import { Conversation } from "@kepto/shared";
import { Avatar } from "@kepto/ui";

interface ConversationHeaderProps {
  conversation: Conversation;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
}) => {
  return (
    <div className="flex gap-4 py-3 border-b border-border">
      <Avatar
        src={conversation.avatarUrl}
        username={conversation.displayName}
      />
      <p>{conversation.displayName}</p>
    </div>
  );
};
