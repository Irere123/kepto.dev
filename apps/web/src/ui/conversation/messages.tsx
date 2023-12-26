"use client";

import { useQueryClient } from "react-query";
import { DirectMessage, NEW_DM_SUBSCRIPTION_QUERY } from "~/graphql/dm";
import useSubscription from "~/hooks/useSubscription";

export const Messages: React.FC<{
  conversationId: string;
  messages: DirectMessage[] | undefined;
}> = ({ conversationId, messages }) => {
  const client = useQueryClient();
  useSubscription(
    () => ({ query: NEW_DM_SUBSCRIPTION_QUERY, variables: { conversationId } }),
    {
      next: (value: any) => {
        console.log(value);
        client.setQueryData("directMessages", (oldData: any) => {
          console.log(oldData);
          return !value
            ? oldData
            : {
                directMessages: [
                  ...oldData.directMessages,
                  value.newDirectMessage,
                ],
              };
        });
      },
    }
  );

  return (
    <>
      {messages?.map((m) => {
        return (
          <div key={m.id}>
            <p>{m.user.displayName}</p>
            <p>{m.text}</p>
          </div>
        );
      })}
    </>
  );
};
