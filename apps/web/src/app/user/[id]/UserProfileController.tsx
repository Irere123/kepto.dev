"use client";

import { getUserProfile } from "@/graphql/user";
import { Location, Plus, ThreeDots } from "@/icons";
import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Paper } from "@/ui/paper";
import { Text } from "@/ui/text";
import { useQuery } from "react-query";
import { ConnectButton } from "./Button";

interface Props {
  userId: string;
}

export const UserProfileController: React.FC<Props> = ({ userId }) => {
  const { data, isLoading } = useQuery("getUserProfile", () =>
    getUserProfile(userId)
  );

  if (isLoading) {
    return <Text>Loading..</Text>;
  }

  return (
    <Paper>
      <div className="flex gap-4 justify-between">
        <div>
          <Text as="h3" weight="700">
            {data?.displayName}
          </Text>
          <Text as="p">@{data?.username}</Text>
        </div>
        <div>
          <Avatar
            size="72"
            isOnline={data?.online as boolean}
            src={data?.avatarUrl}
            username={data?.username}
          />
        </div>
      </div>
      <div>
        <Text as="p" className="text-primary-accents-6">
          {data?.bio}
        </Text>
      </div>
      <div className="flex justify-between mt-4">
        <Text as="h5">{data?.numConnections} connections</Text>
        <div className="flex gap-4 items-center text-primary-fg">
          <ConnectButton
            connected={data?.youConnected!}
            connecteeId={data?.id!}
          />
          <Location />
          <ThreeDots />
        </div>
      </div>
    </Paper>
  );
};
