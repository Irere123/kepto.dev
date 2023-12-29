"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { createConv, getUserProfile } from "@kepto/shared";

import { useMutation, useQuery } from "react-query";
import {
  Card,
  CardFooter,
  ThreeDots,
  Avatar,
  CardHeader,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
} from "@kepto/ui";
import { ConnectButton } from "./Button";
import AuthContext from "~/contexts/AuthContext";

interface Props {
  userId: string;
}

export const UserProfileController: React.FC<Props> = ({ userId }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useQuery("getUserProfile", () =>
    getUserProfile(userId)
  );
  const { mutateAsync: createConvMutate } = useMutation(
    "createConv",
    createConv
  );

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div className="flex flex-col gap-4">
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
              <Button
                onClick={async () => {
                  const res = await createConvMutate(userId);

                  if (!res) {
                    console.log(res);
                  }

                  router.push(`/chat/${res.createConv.id}`);
                }}
              >
                Message
              </Button>
              <ThreeDots />
            </div>
          </div>
        </CardFooter>
      </Card>
      <Tabs defaultValue="overview">
        <TabsList className="h-9 w-full justify-around rounded-none">
          <TabsTrigger
            className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            value="overview"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            value="people"
          >
            People
          </TabsTrigger>
          <TabsTrigger
            className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            value="activity"
          >
            Activity
          </TabsTrigger>
          <TabsTrigger
            className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            value="stack"
          >
            Stack
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-3">
          <p className="text-primary-fg">{data?.bio}</p>
        </TabsContent>
        <TabsContent value="people" className="pt-3">
          <p className="text-primary-fg">Hello people</p>
        </TabsContent>
        <TabsContent value="activity" className="pt-3">
          <p className="text-primary-fg">Hello people</p>
        </TabsContent>
        <TabsContent value="stack" className="pt-3">
          <p className="text-primary-fg">Hello stack</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
