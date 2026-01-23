import { Toggler, FadeLayer } from "@/shared/ui";
import { useTheme } from "@/shared/utils/useTheme";

interface ThemeTogglerProps {
  /** Optional custom background for light mode */
  lightBackground?: React.ReactNode;
  /** Optional custom background for dark mode */
  darkBackground?: React.ReactNode;
  className?: string;
  transitionDurationMs?: number;
}

export function ThemeToggler({
  lightBackground,
  darkBackground,
  className = "",
  transitionDurationMs = 400,
}: ThemeTogglerProps) {
  const { isLight, toggleTheme } = useTheme();

  return (
    <div className={`relative overflow-hidden rounded ${className}`}>
      {lightBackground && (
        <FadeLayer
          visible={isLight}
          transitionDurationMs={transitionDurationMs}
        >
          {lightBackground}
        </FadeLayer>
      )}

      {darkBackground && (
        <FadeLayer
          visible={!isLight}
          transitionDurationMs={transitionDurationMs}
        >
          {darkBackground}
        </FadeLayer>
      )}

      <div className="relative z-10 p-2">
        <Toggler checked={isLight} onChange={toggleTheme} />
      </div>
    </div>
  );
}
