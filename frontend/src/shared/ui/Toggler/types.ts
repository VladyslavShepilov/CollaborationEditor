import type { ChangeEventHandler } from "react";

export interface TogglerProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}
