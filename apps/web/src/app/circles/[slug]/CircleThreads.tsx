"use client";

import { Circle } from "@kepto/shared";
import { Button } from "@kepto/ui";

import { useCreateThreadModal } from "~/ui/modals/create-thread-modal";

interface CircleThreadsProps {
  circle: Circle;
}

export const CircleThreads: React.FC<CircleThreadsProps> = ({ circle }) => {
  const { CreateThreadModal, setShowCreateThreadModal } =
    useCreateThreadModal();

  return (
    <div>
      <Button onClick={() => setShowCreateThreadModal(true)}>Create</Button>
      <CreateThreadModal />
    </div>
  );
};
