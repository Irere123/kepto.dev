import { Metadata, ResolvingMetadata } from "next";
import { LogoLargeIcon } from "@kepto/ui";
import Link from "next/link";

import { apiUrl } from "~/lib/constants";
import { ProtectedPage } from "~/ui/layouts/ProtectedPage";
import { UserProfileController } from "./UserProfileController";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const res = await fetch(`${apiUrl}/user/${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${res.user.displayName} `,
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

export default async function UserProfilePage({ params }: Props) {
  return (
    <ProtectedPage>
      <main className="flex flex-col w-[600px] justify-center m-auto">
        <div className="m-auto mb-6">
          <Link href={`/feed`}>
            <LogoLargeIcon />
          </Link>
        </div>
        <UserProfileController userId={params.id} />
      </main>
    </ProtectedPage>
  );
}
