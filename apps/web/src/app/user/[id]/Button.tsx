"use client";

import { createConnection, removeConnection } from "@/graphql/connection";
import { Close, Plus } from "@/icons";
import { Button } from "@/ui/button";
import { useMutation, useQueryClient } from "react-query";

interface ConnectButtonProps {
  connected: boolean;
  connecteeId: string;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  connected,
  connecteeId,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: createConn, isLoading: createConnLoading } = useMutation(
    "createConnection",
    createConnection,
    {
      onSuccess: () => {
        queryClient.setQueryData("getUserProfile", (oldData: any) =>
          oldData
            ? {
                ...oldData,
                youConnected: true,
              }
            : oldData
        );
      },
    }
  );
  const { mutateAsync: removeConn, isLoading: removeConnLoading } = useMutation(
    "removeConnection",
    removeConnection,
    {
      onSuccess: () => {
        queryClient.setQueryData("getUserProfile", (oldData: any) =>
          oldData
            ? {
                ...oldData,
                youConnected: false,
              }
            : oldData
        );
      },
    }
  );

  return (
    <>
      {!connected ? (
        <Button
          prefix={<Plus />}
          size="small"
          loading={createConnLoading}
          onClick={() => createConn(connecteeId)}
        >
          Connect
        </Button>
      ) : (
        <Button
          prefix={<Close />}
          size="small"
          color="secondary"
          loading={removeConnLoading}
          onClick={() => removeConn(connecteeId)}
        >
          Disconnect
        </Button>
      )}
    </>
  );
};
