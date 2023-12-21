import Link from "next/link";
import React from "react";
import { Plus } from "@kepto/ui";

import { UserProfile } from "~/graphql/user";
import { Avatar } from "~/ui/avatar";
import { Button } from "~/ui/button";
import { Paper } from "~/ui/paper";

export interface UserCardProps {
  user: UserProfile;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Paper transparent border={false}>
      <div className="flex gap-6 text-primary-accents-8">
        <Link href={`/user/${user.id}`}>
          <Avatar src={user.avatarUrl} username={user.username} size="36" />
        </Link>
        <div className="flex justify-between flex-1 items-center">
          <Link href={`/user/${user.id}`}>
            <p>
              {user.displayName}
              <span className="text-primary-accents-6">@{user.username}</span>
            </p>
          </Link>
          <Button size="small" prefix={<Plus />}>
            Connect
          </Button>
        </div>
      </div>
      <div className="text-primary-accents-7">
        <p>{user.bio}</p>
      </div>
    </Paper>
  );
};
