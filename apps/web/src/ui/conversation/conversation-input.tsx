"use client";

import { Input } from "@kepto/ui";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { createDirectMessage } from "~/graphql/dm";

interface ConversationInputProps {
  conversationId: string;
}

export const ConversationInput: React.FC<ConversationInputProps> = ({
  conversationId,
}) => {
  const [message, setMessage] = useState("");
  const { mutateAsync } = useMutation("createDM", createDirectMessage);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const data = { text: message, conversationId };
    await mutateAsync(data);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <Input
        maxLength={512}
        value={message}
        autoComplete="off"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="send message"
      />
    </form>
  );
};
