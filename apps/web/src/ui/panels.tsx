"use client";

import { InfinityIcon, Telescope } from "@kepto/ui";
import { BoxedIcon } from "./boxed-icon";
import Link from "next/link";
import { useContext } from "react";
import SharedDataContext from "~/contexts/SharedDataContext";

export const LeftPanel: React.FC = () => {
  const { userCircles } = useContext(SharedDataContext);

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
      {userCircles?.map((c) => (
        <Link href={`/circles/${c.slug}`} key={c.id}>
          <BoxedIcon name={c.name}>
            {c.name.charAt(0).toUpperCase() + c.name.charAt(1).toUpperCase()}
          </BoxedIcon>
        </Link>
      ))}
    </div>
  );
};
