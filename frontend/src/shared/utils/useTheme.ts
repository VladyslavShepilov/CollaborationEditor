import { useAppSelector } from "./redux";

export function useTheme() {
  const mode = useAppSelector((state) => state.theme.mode);

  return {
    mode,
    isDark: mode === "dark",
    isLight: mode === "light",
  };
}
