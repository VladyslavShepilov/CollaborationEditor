import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalStyleProps {
  backgroundColor?: string;
  borderColor?: string;
  titleColor?: string;
  textColor?: string;
  backdropColor?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: ModalSize;
  className?: string;
  styles?: ModalStyleProps;
}
