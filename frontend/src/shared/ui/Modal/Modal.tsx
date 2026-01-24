import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import type { ModalProps, ModalSize } from "./types";

const SIZE_MAP: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleClick = (e: React.SyntheticEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleClick}
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${SIZE_MAP[size]} mx-4 rounded-xl shadow-2xl border p-0 transition-colors duration-(--transition-theme) bg-card border-border text-text-primary backdrop:backdrop-blur-sm backdrop:bg-black/50 ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        </div>
      )}

      <div className="p-6">{children}</div>
    </dialog>,
    document.body,
  );
}
