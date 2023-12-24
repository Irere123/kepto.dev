"use client";

import { useContext } from "react";
import { useQuery } from "react-query";
import { getUserProfile } from "~/graphql/user";
import {
  Card,
  CardContent,
  CardFooter,
  Location,
  ThreeDots,
  Avatar,
  CardHeader,
} from "@kepto/ui";
import { ConnectButton } from "./Button";
import AuthContext from "~/contexts/AuthContext";

interface Props {
  userId: string;
}

export const UserProfileController: React.FC<Props> = ({ userId }) => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useQuery("getUserProfile", () =>
    getUserProfile(userId)
  );

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4 justify-between">
          <div>
            <p>{data?.displayName}</p>
            <p>@{data?.username}</p>
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
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-primary-accents-6">{data?.bio}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-1 justify-between mt-4">
          <p>{data?.numConnections} connections</p>
          <div className="flex gap-4 items-center text-primary-fg">
            {data?.id == user?.id ? null : (
              <ConnectButton
                connected={data?.youAreConnected!}
                userId={data?.id!}
              />
            )}
            <Location />
            <ThreeDots />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
