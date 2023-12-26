"use client";

import { useQuery } from "react-query";

import { MiddlePanel } from "~/ui/layouts/GridPanels";
import { MainLayout } from "~/ui/layouts/MainLayout";
import { ProtectedPage } from "~/ui/layouts/ProtectedPage";
import { getUsers } from "~/graphql/user";
import { Card, CardContent, CardHeader, CardTitle, Input } from "@kepto/ui";
import { ThreadCard } from "~/ui/thread-card";

export const FeedPage: React.FC = () => {
  const { data, isLoading } = useQuery("users", getUsers);

  if (isLoading) {
    return null;
  }

  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div className="flex flex-col gap-4 mt-7">
            {data?.users.map((u) => (
              <ThreadCard
                id="wiohrwiohio"
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
      </MainLayout>
    </ProtectedPage>
  );
};
