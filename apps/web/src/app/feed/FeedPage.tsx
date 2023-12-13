"use client";

import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { UserCard } from "@/components/UserCard";
import { getUsers } from "@/graphql/user";
import { Button } from "@kepto/ui";
import { useQuery } from "react-query";

export const FeedPage: React.FC = () => {
  const { data, isLoading } = useQuery("users", getUsers);

  if (isLoading) {
    return null;
  }

  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div className="flex flex-col gap-4 px-7 mt-7">
            {data?.users.map((u) => <UserCard key={u.id} user={u} />)}
          </div>
          <Button variant="primary" text="Hello world" />
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
