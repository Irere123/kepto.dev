"use client";

import { NEW_MESSAGE_SUBSCRIPTION_QUERY, getMessages } from "@/graphql/message";
import useSubscription from "@/hooks/useSubscription";
import { Text } from "@/ui/text";
import { useQuery, useQueryClient } from "react-query";

interface ChatMessagesProps {
  connectionId: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ connectionId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("getMessages", () =>
    getMessages(connectionId)
  );
  useSubscription(
    () => ({
      query: NEW_MESSAGE_SUBSCRIPTION_QUERY,
      variables: { connectionId },
    }),
    {
      next(data: any) {
        queryClient.setQueryData("getMessages", (oldData: any) =>
          oldData
            ? [
                ...oldData,
                {
                  ...data.newConnMessage,
                },
              ]
            : oldData
        );
      },
    }
  );

  if (isLoading) {
    return null;
  }

  console.log(data);
  return (
    <div className="flex flex-1 flex-col justify-end py-3">
      <p className="text-primary-fg">
        {data?.map((message) => (
          <div key={message.id}>
            <Text className="text-error-light">
              {message.user.displayName}:{" "}
            </Text>
            <Text>{message.text}</Text>
          </div>
        ))}
      </p>
    </div>
  );
};
