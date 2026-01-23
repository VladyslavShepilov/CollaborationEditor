import type { ChangeEventHandler } from "react";

export type ThemeTransitionsColors = {
  light: string;
  dark: string;
};

export interface TogglerProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  transitionColors?: ThemeTransitionsColors;
}
