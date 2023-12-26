"use client";

import AuthContext from "~/contexts/AuthContext";
import { useScreenSize } from "~/hooks/useScreenSize";
import {
  At,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  LogoLargeIcon,
  People,
  Search,
} from "@kepto/ui";
import { Avatar } from "@kepto/ui";
import Link from "next/link";
import React, { useContext } from "react";

interface Props {
  children: React.ReactNode;
}

const HeaderWrapper: React.FC<Props> = ({ children }) => (
  <div className={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const FixedGridPanel: React.FC<Props> = ({ children }) => {
  return (
    <div className={`flex pt-5 flex-col flex-1 sticky top-0 h-screen`}>
      {children}
    </div>
  );
};

export const LeftPanel: React.FC<Props> = ({ children }) => {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <LogoLargeIcon />
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  );
};

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

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar src={user?.avatarUrl} size="48" username="irere" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/user/${user?.id}`}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Create community</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/auth/logout`}>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {children}
    </GridPanel>
  );
};
