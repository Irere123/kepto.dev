"use client";

import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { getConnections } from "@/graphql/connection";
import { Avatar } from "@/ui/avatar";
import { Text } from "@/ui/text";
import Link from "next/link";
import { useQuery } from "react-query";

interface Props {}

export const ChatPage: React.FC<Props> = () => {
  const { data, isLoading } = useQuery("getConnections", getConnections);

  if (isLoading) {
    return null;
  }

  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div className="mt-4">
            {data?.map((c) => (
              <Link href={`/conn/${c.id}`} key={c.id}>
                <div className="flex gap-4 mb-4">
                  <Avatar src={c.name.avatarUrl} size="40" />
                  <Text as="p">{c.name.displayName}</Text>
                </div>
              </Link>
            ))}
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
