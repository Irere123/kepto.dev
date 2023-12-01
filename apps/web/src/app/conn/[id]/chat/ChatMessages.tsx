"use client";

import { getMessages } from "@/graphql/message";
import useSubscription from "@/hooks/useSubscription";
import { Text } from "@/ui/text";
import { gql } from "graphql-request";
import { useQuery } from "react-query";

interface ChatMessagesProps {
  connectionId: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ connectionId }) => {
  const { data, isLoading } = useQuery("getMessages", () =>
    getMessages(connectionId)
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col justify-end py-3">
      <p className="text-primary-fg">
        {data?.map((message) => (
          <div key={message.id}>
            <Text>{message.text}</Text>
          </div>
        ))}
      </p>
    </div>
  );
};
