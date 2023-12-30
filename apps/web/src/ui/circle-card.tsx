"use client";

import { numberFormatter } from "~/lib/utils";
import { BoxedIcon } from "./boxed-icon";
import { Button } from "@kepto/ui";

interface CircleCardProps {
  id: string;
  name: string;
  description: string;
  topicsCount: number;
  onJoinClick: () => void;
}

export const CircleCard: React.FC<CircleCardProps> = ({
  description,
  id,
  name,
  topicsCount,
  onJoinClick,
}) => {
  return (
    <div>
      <div className="flex flex-col space-y-2 border bg-transparent px-3">
        <div className="flex items-center gap-4 mt-3">
          <BoxedIcon>{name.charAt(0)}</BoxedIcon>
          <div>
            <p>{name}</p>
            <p className="text-muted-foreground">
              {numberFormatter(topicsCount)} topics
            </p>
          </div>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className="pb-3">
          <Button onClick={onJoinClick}>Join</Button>
        </div>
      </div>
    </div>
  );
};
