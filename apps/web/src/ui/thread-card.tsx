import {
  AvatarGroup,
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@kepto/ui";
import Link from "next/link";
import React from "react";
import { numberFormatter } from "~/lib/utils";

interface ThreadCardProps {
  id: string;
  title: string;
  messagesCount: number;
  description: string;
  children?: React.ReactNode;
  topic: string;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({
  id,
  title,
  description,
  topic,
  messagesCount,
}) => {
  return (
    <Link href={`/thread/${id}`}>
      <Card>
        <CardHeader>
          <div className="flex flex-1 gap-5">
            <span className="font-bold">{title}</span>
            <Badge variant="secondary">{topic}</Badge>
          </div>
        </CardHeader>
        <CardContent>{description}</CardContent>
        <CardFooter>
          <div className="flex flex-1 justify-between items-center">
            <AvatarGroup srcArray={["", "", ""]} />
            <span>{numberFormatter(messagesCount)} messages</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
