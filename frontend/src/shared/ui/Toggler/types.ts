import type { ChangeEventHandler, ReactNode } from "react";

export interface TogglerProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
  ariaLabel?: string;
}
