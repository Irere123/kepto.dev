"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Filter,
} from "@kepto/ui";
import { CircleCard } from "~/ui/circle-card";
import { MainLayout } from "~/ui/layouts/MainLayout";

// export const metadata: Metadata = {
//   title: "Explore",
// };

export default function CirclesPage() {
  return (
    <MainLayout>
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
        <CircleCard
          description="This is the description of the circle if want to join please read it"
          id="83274984"
          name="Figma"
          onJoinClick={() => {}}
          topicsCount={120}
        />
      </div>
    </MainLayout>
  );
}
