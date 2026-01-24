import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeState, Theme } from "./types";

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "dark" || stored === "light") return stored;

  // Check system preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

// Apply theme to document
function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
}

const initialTheme = getInitialTheme();

const initialState: ThemeState = {
  mode: initialTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
      applyTheme(action.payload);
    },
    toggleTheme: (state) => {
      const newTheme = state.mode === "light" ? "dark" : "light";
      state.mode = newTheme;
      applyTheme(newTheme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
