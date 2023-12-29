"use client";

import { InfinityIcon, Telescope } from "@kepto/ui";
import { BoxedIcon } from "./boxed-icon";
import Link from "next/link";

export const LeftPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 mt-8">
      <Link href={`/feed`}>
        <BoxedIcon name="Everything">
          <InfinityIcon />
        </BoxedIcon>
      </Link>
      <Link href={`/circles`}>
        <BoxedIcon name="Explore">
          <Telescope />
        </BoxedIcon>
      </Link>
    </div>
  );
};
