import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: ModalSize;
  className?: string;
}
