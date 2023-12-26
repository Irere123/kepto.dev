import { ConversationPageController } from "./ConversationPageController";

interface Params {
  params: { convId: string };
}

export default function ConversationPage({ params }: Params) {
  return <ConversationPageController convId={params.convId} />;
}
