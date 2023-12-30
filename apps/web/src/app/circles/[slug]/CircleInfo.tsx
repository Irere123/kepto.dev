"use client";

import { Circle, CircleMember } from "@kepto/shared";
import {
  Avatar,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@kepto/ui";

const CircleMembers: React.FC<{ members: CircleMember[] }> = ({ members }) => {
  return (
    <div className="flex flex-col space-y-3">
      {members.map((m) => (
        <div key={m.id} className="flex gap-5">
          <Avatar src={m.avatarUrl} username={m.username} />
          <div className="flex flex-col gap-2">
            <p>
              {m.displayName}{" "}
              {m.admin ? <Badge variant="outline">Admin</Badge> : null}
            </p>
            <p className="text-sm text-muted-foreground">{m.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CircleInfo: React.FC<{ circle: Circle }> = ({ circle }) => {
  return (
    <Tabs defaultValue="threads" className="flex flex-col w-full">
      <TabsList>
        <TabsTrigger value="threads">Threads</TabsTrigger>
        <TabsTrigger value="topics">Topics</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
      </TabsList>
      <TabsContent value="threads">Circle Threads</TabsContent>
      <TabsContent value="topics">Circle Topics</TabsContent>
      <TabsContent value="members">
        <CircleMembers members={circle.members} />
      </TabsContent>
    </Tabs>
  );
};
