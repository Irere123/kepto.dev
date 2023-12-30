"use client";

import { getTopCircles } from "@kepto/shared";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Filter,
} from "@kepto/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { CircleCard } from "~/ui/circle-card";

export const CirclesController: React.FC = () => {
  const { push } = useRouter();
  const { data, isLoading } = useQuery("getTopCircles", () => getTopCircles());

  if (isLoading) {
    return <p>loading..</p>;
  }

  return (
    <div className="flex flex-col mt-3 gap-3">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              <Filter className="mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Top circles</DropdownMenuItem>
            <DropdownMenuItem>Life</DropdownMenuItem>
            <DropdownMenuItem>Web development</DropdownMenuItem>
            <DropdownMenuItem>Social</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {data?.circles.map((c) => (
        <Link key={c.id} href={`/circles/${c.slug}`}>
          <CircleCard
            description={c.description}
            id={c.id}
            name={c.name}
            onJoinClick={() => push(`/circles/${c.slug}`)}
            members={c.members}
            membersCount={c.membersCount}
          />
        </Link>
      ))}
    </div>
  );
};
