"use client";

import AuthContext from "@/contexts/AuthContext";
import { useScreenSize } from "@/hooks/useScreenSize";
import { At, LogoLargeIcon, People, Search } from "@/icons";
import { Avatar } from "@/ui/avatar";
import Link from "next/link";
import React, { useContext } from "react";

interface Props {
  children: React.ReactNode;
}

export const GridPanel: React.FC<Props> = ({ children }) => {
  return <div className={`flex flex-col flex-1 w-full`}>{children}</div>;
};

export const MiddlePanel: React.FC<Props> = ({ children }) => {
  const screenSize = useScreenSize();
  const { user } = useContext(AuthContext);

  return (
    <GridPanel>
      <div
        className={
          !(screenSize === "fullscreen")
            ? `flex sticky w-full flex-col z-10 bg-primary-bg pt-5`
            : ""
        }
      >
        <div className="flex w-full items-center text-primary-fg justify-between mb-4">
          <div>
            <LogoLargeIcon />
          </div>
          <div className="flex gap-8">
            <Link href={`/feed`}>
              <People />
            </Link>
            <Link href={`/chat`}>
              <At />
            </Link>
            <Link href={`/search`}>
              <Search />
            </Link>
          </div>
          <div>
            <Link href={`/user/${user?.id}`}>
              <Avatar src={user?.avatarUrl} size="36" username="irere" />
            </Link>
          </div>
        </div>
      </div>
      {children}
    </GridPanel>
  );
};
