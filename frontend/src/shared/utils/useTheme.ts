import { useAppSelector, useAppDispatch } from "./redux";
import { toggleTheme, setTheme, type Theme } from "@/shared/model/theme";

export function useTheme() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return {
    mode,
    isDark: mode === "dark",
    isLight: mode === "light",
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (theme: Theme) => dispatch(setTheme(theme)),
  };
}
