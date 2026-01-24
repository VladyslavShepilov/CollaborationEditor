import { Toggler } from "@/shared/ui";
import { useTheme } from "@/shared/utils/useTheme";
import type { ThemeTogglerProps } from "./types";

export function ThemeToggler({ className = "" }: ThemeTogglerProps) {
  const { isLight, toggleTheme } = useTheme();

  return (
    <div
      className={`overflow-hidden rounded p-2 transition-colors duration-(--transition-theme) bg-accent-soft ${className}`}
    >
      <Toggler
        checked={isLight}
        onChange={toggleTheme}
        checkedIcon="☀️"
        uncheckedIcon="🌙"
        ariaLabel="Toggle theme"
      />
    </div>
  );
}
