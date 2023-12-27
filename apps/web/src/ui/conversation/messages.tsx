"use client";

import { useContext } from "react";
import { useQueryClient } from "react-query";

import AuthContext from "~/contexts/AuthContext";
import { DirectMessage, NEW_DM_SUBSCRIPTION_QUERY } from "~/graphql/dm";
import useSubscription from "~/hooks/useSubscription";

export const Messages: React.FC<{
  conversationId: string;
  messages: DirectMessage[] | undefined;
}> = ({ conversationId, messages }) => {
  const client = useQueryClient();
  const { user } = useContext(AuthContext);
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
          <>
            <div
              key={m.id}
              className={`flex mb-3 w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm
          ${
            m.user.id === user?.id
              ? "ml-auto bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
            >
              <p>{m.text}</p>
            </div>
          </>
        );
      })}
    </>
  );
};
