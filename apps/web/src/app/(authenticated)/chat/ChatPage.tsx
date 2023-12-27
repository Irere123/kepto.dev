"use client";

import Link from "next/link";
import { useQuery } from "react-query";
import { useContext } from "react";
import { formatDistanceStrict } from "date-fns";
import { Avatar, Button } from "@kepto/ui";

import { MiddlePanel } from "~/ui/layouts/GridPanels";
import { useCreateConvModal } from "~/ui/modals/create-conversation-modal";
import { MainLayout } from "~/ui/layouts/MainLayout";
import { ProtectedPage } from "~/ui/layouts/ProtectedPage";
import { ModalContext } from "~/ui/modals/provider";
import { getConversations } from "~/graphql/conversation";

interface Props {}

export const ChatPage: React.FC<Props> = () => {
  const { CreateConvModal } = useCreateConvModal();
  const { setShowCreateConvModal } = useContext(ModalContext);
  const { data, isLoading } = useQuery("conversations", getConversations);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div className="mt-4">
            <Button onClick={() => setShowCreateConvModal(true)}>Create</Button>
            <CreateConvModal />
            {data?.conversations.map((c) => (
              <Link key={c.id} href={`/chat/${c.id}`}>
                <div className="flex gap-4 mt-4">
                  <Avatar src={c.avatarUrl} />
                  <div>
                    <p>{c.displayName}</p>
                    <p className="text-muted-foreground">
                      {c.message
                        ? c.message.text
                        : `Say Hi to ${c.displayName}`}
                    </p>
                    <p className="text-accent-foreground">
                      {formatDistanceStrict(
                        new Date(c.message.createdAt),
                        new Date()
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
};
