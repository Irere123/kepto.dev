"use client";

import { useQuery } from "react-query";
import { Button, Input } from "@kepto/ui";
import { getUsers } from "@kepto/shared";

import { ThreadCard } from "~/ui/thread-card";
import DefaultLayout from "~/ui/layouts/DefaultLayout";
import { MiddlePanel } from "~/ui/layouts/GridPanels";

export const FeedPage: React.FC = () => {
  const { data, isLoading } = useQuery("users", getUsers);

  if (isLoading) {
    return null;
  }

  return (
    <DefaultLayout>
      <MiddlePanel>
        <div>
          <Button>Create</Button>
        </div>
        <div className="flex flex-col gap-4 mt-7">
          {data?.users.map((u) => (
            <ThreadCard
              id={u.id}
              topic="reactjs"
              key={u.id}
              description={u.bio!}
              title={u.displayName}
              messagesCount={1133}
            />
          ))}
          <Input placeholder="Send message" />
        </div>
      </MiddlePanel>
    </DefaultLayout>
  );
};
