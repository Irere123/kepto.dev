import React, { Dispatch, SetStateAction } from "react";
import { useCreateConvModal } from "./create-conversation-modal";

export const ModalContext = React.createContext<{
  setShowCreateConvModal: Dispatch<SetStateAction<boolean>>;
}>({ setShowCreateConvModal: () => {} });

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { CreateConvModal, setShowCreateConvModal } = useCreateConvModal();
  return (
    <ModalContext.Provider value={{ setShowCreateConvModal }}>
      <CreateConvModal />
      {children}
    </ModalContext.Provider>
  );
}
