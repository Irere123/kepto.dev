"use client";

import useSubscription from "@/hooks/useSubscription";
import { gql } from "graphql-request";

const querysub = gql`
  subscription {
    hello
  }
`;

export const ChatMessages: React.FC = () => {
  useSubscription(() => ({ query: querysub }), {
    next(value) {
      console.log(value);
    },
  });
  return (
    <div className="flex flex-1 flex-col justify-end py-3">
      <p className="text-primary-fg">Helo</p>
    </div>
  );
};
