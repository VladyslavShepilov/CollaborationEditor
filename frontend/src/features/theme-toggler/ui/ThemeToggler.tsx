import { Toggler, FadeLayer } from "@/shared/ui";
import { useTheme } from "@/shared/utils/useTheme";
import type { ThemeTogglerProps } from "./types";

export function ThemeToggler({
  lightBackground,
  darkBackground,
  className = "",
}: ThemeTogglerProps) {
  const { isLight, toggleTheme } = useTheme();

  return (
    <div className={`relative overflow-hidden rounded ${className}`}>
      {lightBackground && (
        <FadeLayer visible={isLight}>{lightBackground}</FadeLayer>
      )}

      {darkBackground && (
        <FadeLayer visible={!isLight}>{darkBackground}</FadeLayer>
      )}

      <div className="relative z-10 p-2">
        <Toggler checked={isLight} onChange={toggleTheme} />
      </div>
    </div>
  );
}
