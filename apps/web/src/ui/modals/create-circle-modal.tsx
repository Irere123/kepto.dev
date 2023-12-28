"use client";
import { Button, Input, Label, Modal, Textarea } from "@kepto/ui";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

interface HelperProps {
  setShowCreateCircleModal: Dispatch<SetStateAction<boolean>>;
  showCreateCircleModal: boolean;
}

export function CreateCircleModalHelper({
  setShowCreateCircleModal,
  showCreateCircleModal,
}: HelperProps) {
  return (
    <Modal
      setShowModal={setShowCreateCircleModal}
      showModal={showCreateCircleModal}
    >
      <div className="flex flex-col space-y-3 border-b px-4 py-3 pt-6 sm:px-16 justify-center items-center">
        <h3 className="text-lg">Create a dev circle</h3>
        <p className="text-center text-sm text-muted-foreground">
          Create a circle for your your community to talk to each other and
          discuss about topics.
        </p>
      </div>
      <div className="flex flex-col space-y-3 px-4 py-4">
        <Label>Name</Label>
        <Input
          placeholder="Cirle's name"
          maxLength={60}
          autoComplete="off"
          autoFocus
        />
        <Label>Description</Label>
        <Textarea
          placeholder="About"
          rows={6}
          maxLength={500}
          autoComplete="off"
        />
      </div>
      <div className="px-4 py-4">
        <Button>Create</Button>
      </div>
    </Modal>
  );
}

export function useCreateCircleModal() {
  const [showCreateCircleModal, setShowCreateCircleModal] = useState(false);

  const CreateCircleModal = useCallback(() => {
    return (
      <CreateCircleModalHelper
        showCreateCircleModal={showCreateCircleModal}
        setShowCreateCircleModal={setShowCreateCircleModal}
      />
    );
  }, [showCreateCircleModal, setShowCreateCircleModal]);

  return useMemo(
    () => ({ setShowCreateCircleModal, CreateCircleModal }),
    [setShowCreateCircleModal, CreateCircleModal]
  );
}
