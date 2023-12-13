import * as React from "react";
import { cn } from "./utils/cn";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  children: React.ReactNode;
  className?: string;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  desktopOnly?: boolean;
  preventDefaultClose?: boolean;
}

export function Modal({
  children,
  className,
  desktopOnly,
  onClose,
  preventDefaultClose,
  setShowModal,
  showModal,
}: ModalProps) {
  const router = useRouter();

  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return;
    }

    onClose && onClose();

    if (setShowModal) {
      setShowModal(false);
    } else {
      router.back();
    }
  };

  return (
    <Dialog.Root
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          id="modal-backdrop"
          className="animate-fade-in fixed inset-0 z-40 px-4 bg-opacity-50 backdrop-blur-md"
        >
          <Dialog.Content
            className={cn(
              "animate-scale-in fixed inset-0 z-40 max-h-fit w-full max-w-md  overflow-hidden border border-primary-accents-5 bg-white p-0 shadow-xl md:rounded-2xl"
            )}
          >
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
