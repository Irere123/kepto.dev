"use client";

import { createMessage } from "@/graphql/message";
import { Input } from "@/ui/input";
import React, { FormEvent, useState } from "react";
import { useMutation } from "react-query";

interface ChatInputProps {
  connectionId: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ connectionId }) => {
  const [message, setMessage] = useState("");
  const { mutateAsync } = useMutation("createMessage", createMessage);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { text: message, connectionId };

    await mutateAsync(data);

    setMessage("");
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <Input
          maxLength={512}
          value={message}
          placeholder="Send a message"
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
      </form>
    </div>
  );
};
