import React, { Dispatch, SetStateAction } from "react";
import { useCreateConvModal } from "./create-conversation-modal";
import { useCreateCircleModal } from "./create-circle-modal";

export const ModalContext = React.createContext<{
  setShowCreateConvModal: Dispatch<SetStateAction<boolean>>;
  setShowCreateCircleModal: Dispatch<SetStateAction<boolean>>;
}>({ setShowCreateConvModal: () => {}, setShowCreateCircleModal: () => {} });

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { CreateConvModal, setShowCreateConvModal } = useCreateConvModal();
  const { CreateCircleModal, setShowCreateCircleModal } =
    useCreateCircleModal();

  return (
    <ModalContext.Provider
      value={{ setShowCreateConvModal, setShowCreateCircleModal }}
    >
      <CreateConvModal />
      <CreateCircleModal />
      {children}
    </ModalContext.Provider>
  );
}
