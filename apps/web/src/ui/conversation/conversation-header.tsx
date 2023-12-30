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
    <div>
      <Avatar
        src={conversation.avatarUrl}
        username={conversation.displayName}
      />
      <p>{conversation.displayName}</p>
    </div>
  );
};
