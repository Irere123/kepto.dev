import { Metadata, ResolvingMetadata } from "next";
import { Github, Link, Location, LogoLargeIcon, Plus } from "@/icons";
import { apiUrl } from "@/lib/constants";
import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Paper } from "@/ui/paper";
import { Text } from "@/ui/text";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const res = await fetch(`${apiUrl}/user/${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${res.user.displayName} | Kepto`,
    description: res.user.bio,
    twitter: {
      images: [res.user.avatarUrl],
      description: res.user.bio,
    },
    openGraph: {
      description: res.user.bio,
      username: res.user.username,
      images: [res.user.avatarUrl, ...previousImages],
    },
  };
}

async function getData(id: string) {
  const res = await fetch(`${apiUrl}/user/${id}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function UserProfilePage({ params }: Props) {
  const data = await getData(params.id);

  return (
    <main className="flex flex-col w-[600px] justify-center m-auto">
      <div className="m-auto mb-6">
        <LogoLargeIcon />
      </div>
      <Paper>
        <div className="flex gap-4 justify-between">
          <div>
            <Text as="h3" weight="700">
              {data.user.displayName}
            </Text>
            <Text as="p">@{data.user.username}</Text>
          </div>
          <div>
            <Avatar
              size="72"
              isOnline={data.user.online}
              src={data.user.avatarUrl}
              username={data.user.username}
            />
          </div>
        </div>
        <div>
          <Text as="p" className="text-primary-accents-6">
            {data.user.bio}
          </Text>
        </div>
        <div className="flex justify-between mt-4">
          <Text as="h5">450 connections</Text>
          <div className="flex gap-4 items-center text-primary-fg">
            <Button prefix={<Plus />} size="small">
              Connect
            </Button>
            <Location />
            <Link />
          </div>
        </div>
      </Paper>
    </main>
  );
}
