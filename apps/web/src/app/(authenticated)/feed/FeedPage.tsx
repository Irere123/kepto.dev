"use client";

import { useQuery } from "react-query";

import { MiddlePanel } from "~/ui/layouts/GridPanels";
import { MainLayout } from "~/ui/layouts/MainLayout";
import { ProtectedPage } from "~/ui/layouts/ProtectedPage";
import { getUsers } from "~/graphql/user";
import { Card, CardContent, CardHeader, CardTitle, Input } from "@kepto/ui";

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
            {data?.users.map((u) => (
              <Card key={u.id}>
                <CardHeader>
                  <CardTitle>{u.username}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{u.bio}</p>
                </CardContent>
              </Card>
            ))}
            <Input placeholder="Send message" />
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
