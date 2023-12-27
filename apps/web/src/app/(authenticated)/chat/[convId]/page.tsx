import { Metadata } from "next";
import { ConversationPageController } from "./ConversationPageController";

interface Params {
  params: { convId: string };
}

export const metadata: Metadata = {
  title: "Conversation",
};

export default function ConversationPage({ params }: Params) {
  return <ConversationPageController convId={params.convId} />;
}
