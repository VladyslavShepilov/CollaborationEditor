import React, { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";

import { useTheme } from "@/shared/utils/useTheme";

import type { ModalProps, ModalStyleProps, ModalSize } from "./types";

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const DEFAULT_STYLES: Required<ModalStyleProps> = {
  backgroundColor: "var(--card)",
  borderColor: "var(--border)",
  titleColor: "var(--text-primary)",
  textColor: "var(--text-primary)",
  backdropColor: "rgba(0, 0, 0, 0.5)",
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  className = "",
  styles = {},
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isLight } = useTheme();
  const mergedStyles = { ...DEFAULT_STYLES, ...styles };
  const themeClass = isLight ? "theme-light" : "theme-dark";

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

  const onClick = (e: React.SyntheticEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const dialogStyle: CSSProperties = {
    backgroundColor: mergedStyles.backgroundColor,
    borderColor: mergedStyles.borderColor,
    color: mergedStyles.textColor,
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={(e) => {
        onClick(e);
      }}
      className={`${themeClass} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${SIZE_CLASSES[size]} mx-4 rounded-xl shadow-2xl border p-0 backdrop:backdrop-blur-sm transition-colors ${className}`}
      style={{
        ...dialogStyle,
        transitionDuration: "var(--transition-theme)",
        // @ts-expect-error CSS custom property for backdrop
        "--modal-backdrop-color": mergedStyles.backdropColor,
      }}
    >
      <style>{`
        dialog::backdrop {
          background-color: var(--modal-backdrop-color, rgba(0, 0, 0, 0.5));
          backdrop-filter: blur(4px);
        }
      `}</style>

      {title && (
        <div
          className="px-6 py-4 border-b"
          style={{ borderColor: mergedStyles.borderColor }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: mergedStyles.titleColor }}
          >
            {title}
          </h2>
        </div>
      )}

      <div className="p-6" style={{ color: mergedStyles.textColor }}>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}
