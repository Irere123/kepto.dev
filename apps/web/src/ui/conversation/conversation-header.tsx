"use client";

interface ConversationHeaderProps {
  conversationId: string;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversationId,
}) => {
  return (
    <div>
      <p>Conv ID: {conversationId}</p>
    </div>
  );
};
