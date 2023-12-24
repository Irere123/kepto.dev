"use client";

import { useQuery } from "react-query";

import { MiddlePanel } from "~/ui/layouts/GridPanels";
import { MainLayout } from "~/ui/layouts/MainLayout";
import { ProtectedPage } from "~/ui/layouts/ProtectedPage";
import { UserCard } from "~/ui/UserCard";
import { getUsers } from "~/graphql/user";

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
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
