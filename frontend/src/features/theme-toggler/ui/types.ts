import type { ReactNode } from "react";

export interface ThemeTogglerProps {
  lightBackground?: ReactNode;
  darkBackground?: ReactNode;
  className?: string;
  transitionDurationMs?: number;
}
