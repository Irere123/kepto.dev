import { Metadata } from "next";
import { ConversationPageController } from "./ConversationPageController";
import { GET_CONVERSATION_QUERY, apiUrl } from "@kepto/shared";

type Props = {
  params: { convId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getData(convId: string) {
  const requestBody = {
    query: GET_CONVERSATION_QUERY,
    variables: { conversationId: convId },
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

export const metadata: Metadata = {
  title: "Conversation",
};

export default async function ConversationPage({ params }: Props) {
  const data = await getData(params.convId);
  console.log(data);
  return <ConversationPageController convId={params.convId} />;
}
