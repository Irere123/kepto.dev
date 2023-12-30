"use client";

import { numberFormatter } from "~/lib/utils";
import { BoxedIcon } from "./boxed-icon";
import { AvatarGroup, Button } from "@kepto/ui";
import { CircleMember } from "@kepto/shared";
import Image from "next/image";

interface CircleCardProps {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  members: CircleMember[];
  onJoinClick: () => void;
}

export const CircleCard: React.FC<CircleCardProps> = ({
  description,
  id,
  name,
  membersCount,
  members,
  onJoinClick,
}) => {
  const memberAvatars = members.map((m) => m.avatarUrl);

  return (
    <div>
      <div className="flex flex-col space-y-2 border bg-transparent px-3">
        <div className="flex items-center gap-4 mt-3">
          <BoxedIcon>
            <Image
              alt={name}
              width={40}
              height={40}
              src={`https://avatar.vercel.sh/rauchg.svg?text=GR`}
            />
          </BoxedIcon>
          <div>
            <p>{name}</p>
            <p className="text-muted-foreground">
              {numberFormatter(membersCount)}{" "}
              {membersCount > 1 ? "members" : "member"}
            </p>
          </div>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className="flex justify-between items-center pb-3">
          <Button onClick={onJoinClick}>Join</Button>
          <AvatarGroup srcArray={memberAvatars} />
        </div>
      </div>
    </div>
  );
};
