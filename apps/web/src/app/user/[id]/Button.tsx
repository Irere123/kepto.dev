"use client";

import { connect, unconnect } from "~/graphql/connect";
import { Close, Plus } from "@kepto/ui";
import { Button } from "~/ui/button";
import { useMutation, useQueryClient } from "react-query";

interface ConnectButtonProps {
  connected: boolean;
  userId: string;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  connected,
  userId,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: connectMutate, isLoading: connectLoading } = useMutation(
    "connect",
    connect,
    {
      onSuccess: () => {
        queryClient.setQueryData("getUserProfile", (oldData: any) =>
          oldData
            ? {
                ...oldData,
                youAreConnected: true,
              }
            : oldData
        );
      },
    }
  );
  const { mutateAsync: unconnectMutate, isLoading: unconnectLoading } =
    useMutation("unconnect", unconnect, {
      onSuccess: () => {
        queryClient.setQueryData("getUserProfile", (oldData: any) =>
          oldData
            ? {
                ...oldData,
                youAreConnected: false,
              }
            : oldData
        );
      },
    });

  return (
    <>
      {!connected ? (
        <Button
          prefix={<Plus />}
          size="small"
          loading={connectLoading}
          onClick={() => connectMutate(userId)}
        >
          Connect
        </Button>
      ) : (
        <Button
          prefix={<Close />}
          size="small"
          color="secondary"
          loading={unconnectLoading}
          onClick={() => unconnectMutate(userId)}
        >
          Disconnect
        </Button>
      )}
    </>
  );
};
