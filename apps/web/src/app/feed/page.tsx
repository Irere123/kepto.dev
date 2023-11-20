"use client";
import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { UserCard } from "@/components/UserCard";
import AuthContext from "@/contexts/AuthContext";
import { getUsers } from "@/graphql/user";
import { User } from "@kepto/db";
import React, { useContext } from "react";
import { useQuery } from "react-query";

export default function DashBoardPage() {
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
}
