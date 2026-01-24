import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { toggleTheme, setTheme } from "./themeSlice";
import type { Theme } from "./types";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

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
