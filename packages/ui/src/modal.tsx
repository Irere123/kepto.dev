import * as React from "react";
import { cn } from "./utils/cn";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Close } from "./icons";

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
          className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-in fixed inset-0 z-40 backdrop-blur-md"
        >
          <Dialog.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            className={cn(
              "animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border bg-background p-0 shadow-xl md:rounded-2xl",
              className
            )}
          >
            {children}
            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <Close className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
