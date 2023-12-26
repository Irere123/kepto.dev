"use client";

interface ConversationMessagesProps {
  conversationId: string;
}

export const ConversationMessages: React.FC<ConversationMessagesProps> = ({
  conversationId,
}) => {
  return (
    <div className="flex flex-1 flex-col">
      <p>Messages</p>
    </div>
  );
};
