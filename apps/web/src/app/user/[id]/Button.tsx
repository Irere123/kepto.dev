"use client";

import { follow, unfollow } from "@/graphql/follow";
import { Close, Plus } from "@/icons";
import { Button } from "@/ui/button";
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
  const { mutateAsync: followMutate, isLoading: followLoading } = useMutation(
    "follow",
    follow,
    {
      onSuccess: () => {
        queryClient.setQueryData("getUserProfile", (oldData: any) =>
          oldData
            ? {
                ...oldData,
                youAreFollowing: true,
              }
            : oldData
        );
      },
    }
  );
  const { mutateAsync: unfollowMutate, isLoading: unfollowLoading } =
    useMutation("unfollow", unfollow, {
      onSuccess: () => {
        queryClient.setQueryData("getUserProfile", (oldData: any) =>
          oldData
            ? {
                ...oldData,
                youAreFollowing: false,
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
          loading={followLoading}
          onClick={() => followMutate(userId)}
        >
          Connect
        </Button>
      ) : (
        <Button
          prefix={<Close />}
          size="small"
          color="secondary"
          loading={unfollowLoading}
          onClick={() => unfollowMutate(userId)}
        >
          Disconnect
        </Button>
      )}
    </>
  );
};
