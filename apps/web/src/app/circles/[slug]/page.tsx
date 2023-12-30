import { GET_CIRCLE_QUERY, apiUrl } from "@kepto/shared";
import { Metadata, ResolvingMetadata } from "next";
import DefaultLayout from "~/ui/layouts/DefaultLayout";
import { MiddlePanel } from "~/ui/layouts/GridPanels";
import { MainLayout } from "~/ui/layouts/MainLayout";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getData(slug: string) {
  const requestBody = {
    query: GET_CIRCLE_QUERY,
    variables: { slug },
  };

  const res = await fetch(`${apiUrl}/graphql`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!res) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const {
    data: { circle },
  } = await getData(slug);

  const ogData = {
    title: circle.name,
    description: circle.description,
  };

  return {
    ...ogData,
    openGraph: {
      ...ogData,
    },
    twitter: {
      ...ogData,
    },
  };
}
export default async function CirclePage({ params }: Props) {
  const {
    data: { circle },
  } = await getData(params.slug);

  return (
    <MainLayout>
      <MiddlePanel>
        <p>{circle.description}</p>
      </MiddlePanel>
    </MainLayout>
  );
}
