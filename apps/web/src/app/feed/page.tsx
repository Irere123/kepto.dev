"use client";
import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedPage } from "@/components/ProtectedPage";
import { UserCard } from "@/components/UserCard";
import AuthContext from "@/contexts/AuthContext";
import { User } from "@kepto/db";
import React, { useContext } from "react";

export default function DashBoardPage() {
  const { user } = useContext(AuthContext);
  return (
    <ProtectedPage>
      <MainLayout>
        <MiddlePanel>
          <div className="flex flex-col gap-4 px-7 mt-7">
            <UserCard user={user as User} />
            <UserCard user={user as User} />
            <UserCard user={user as User} />
            <UserCard user={user as User} />
          </div>
        </MiddlePanel>
      </MainLayout>
    </ProtectedPage>
  );
}
