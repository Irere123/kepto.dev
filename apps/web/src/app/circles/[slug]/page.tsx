import { Circle, GET_CIRCLE_QUERY, apiUrl } from "@kepto/shared";
import { Card, CardContent, CardFooter, CardHeader } from "@kepto/ui";
import { Metadata, ResolvingMetadata } from "next";
import { MainLayout } from "~/ui/layouts/MainLayout";
import { LeftPanel } from "~/ui/panels";
import { CircleInfo } from "./CircleInfo";
import { format } from "date-fns";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getData(slug: string): Promise<{ data: { circle: Circle } }> {
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
    <MainLayout leftPanel={<LeftPanel />}>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <p>{circle.name}</p>
          </CardHeader>
          <CardContent>
            <p>{circle.description}</p>
          </CardContent>
          <CardFooter>
            <p>
              created on {format(new Date(circle.createdAt), "LLL dd yyyy")}
            </p>
          </CardFooter>
        </Card>
        <div className="mt-4">
          <CircleInfo circle={circle} />
        </div>
      </div>
    </MainLayout>
  );
}
