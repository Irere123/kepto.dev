import { Close } from "../icons";
import React, { useEffect, useRef } from "react";

export type ToastDurations = "default" | "sticky";

export interface ToastProps {
  message: string;
  duration?: ToastDurations;
  button?: React.ReactNode;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  button,
  duration = "default",
  onClose,
}) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (duration === "sticky") {
      return;
    }

    const timer = setTimeout(() => {
      onCloseRef.current?.();
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <div
      className={`flex rounded-lg p-3 relativew-full items-center justify-center bg-primary-accents-1 text-primary-fg`}
    >
      {onClose ? (
        <div
          className={`flex absolute cursor-pointer`}
          style={{ top: 5, right: 7, width: 13, height: 13 }}
          onClick={onClose}
        >
          <Close />
        </div>
      ) : null}
      <div className={`flex space-x-4 items-center`}>
        <div className="bold">{message}</div>
        {button}
      </div>
    </div>
  );
};
