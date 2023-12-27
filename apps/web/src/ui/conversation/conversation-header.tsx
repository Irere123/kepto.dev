"use client";

import { Avatar } from "@kepto/ui";
import { Conversation } from "~/graphql/conversation";

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
