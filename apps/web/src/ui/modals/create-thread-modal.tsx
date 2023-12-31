import { Input, Label, Modal } from "@kepto/ui";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

interface CreateThreadModalHelperProps {
  showCreateThreadModal: boolean;
  setShowCreateThreadModal: Dispatch<SetStateAction<boolean>>;
}

function CreateThreadModalHelper({
  setShowCreateThreadModal,
  showCreateThreadModal,
}: CreateThreadModalHelperProps) {
  return (
    <Modal
      showModal={showCreateThreadModal}
      setShowModal={setShowCreateThreadModal}
    >
      <div className="flex flex-col justify-center items-center px-4 py-4 gap-4">
        <h3 className="text-lg">Create new thread</h3>
      </div>
      <div className="flex flex-col gap-3 px-4 space-y-3 mb-3">
        <Input placeholder="what's the title" />
      </div>
    </Modal>
  );
}

export function useCreateThreadModal() {
  const [showCreateThreadModal, setShowCreateThreadModal] = useState(false);

  const CreateThreadModal = useCallback(() => {
    return (
      <CreateThreadModalHelper
        setShowCreateThreadModal={setShowCreateThreadModal}
        showCreateThreadModal={showCreateThreadModal}
      />
    );
  }, [showCreateThreadModal, setShowCreateThreadModal]);

  return useMemo(
    () => ({ setShowCreateThreadModal, CreateThreadModal }),
    [setShowCreateThreadModal, CreateThreadModal]
  );
}
