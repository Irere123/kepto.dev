import React, { Dispatch, SetStateAction } from "react";
import { useCreateConvModal } from "./create-conversation-modal";
import { useCreateCircleModal } from "./create-circle-modal";
import { useCreateThreadModal } from "./create-thread-modal";

export const ModalContext = React.createContext<{
  setShowCreateConvModal: Dispatch<SetStateAction<boolean>>;
  setShowCreateCircleModal: Dispatch<SetStateAction<boolean>>;
  setShowCreateThreadModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowCreateConvModal: () => {},
  setShowCreateCircleModal: () => {},
  setShowCreateThreadModal: () => {},
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { CreateConvModal, setShowCreateConvModal } = useCreateConvModal();
  const { CreateCircleModal, setShowCreateCircleModal } =
    useCreateCircleModal();
  const { CreateThreadModal, setShowCreateThreadModal } =
    useCreateThreadModal();

  return (
    <ModalContext.Provider
      value={{
        setShowCreateConvModal,
        setShowCreateCircleModal,
        setShowCreateThreadModal,
      }}
    >
      <CreateConvModal />
      <CreateCircleModal />
      <CreateThreadModal />
      {children}
    </ModalContext.Provider>
  );
}
