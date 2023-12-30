"use client";

import { useQuery } from "react-query";
import { getDirectMessages } from "@kepto/shared";

import { Messages } from "./messages";

interface ConversationMessagesProps {
  conversationId: string;
}

export const ConversationMessages: React.FC<ConversationMessagesProps> = ({
  conversationId,
}) => {
  const { data, isLoading } = useQuery("directMessages", () =>
    getDirectMessages(conversationId)
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="flex flex-1 flex-col justify-end mb-3">
      <Messages
        conversationId={conversationId}
        messages={data?.directMessages}
      />
    </div>
  );
};
