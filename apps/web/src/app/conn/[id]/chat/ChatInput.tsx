"use client";

import { Input } from "@/ui/input";
import { Form, Formik } from "formik";
import React, { FormEvent, useState } from "react";

interface ChatInputProps {}

type InitialValues = {
  message: string;
};

export const ChatInput: React.FC<ChatInputProps> = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);

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
