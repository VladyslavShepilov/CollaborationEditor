import { Outlet } from "react-router";
import { ThemeToggler } from "@/features/theme-toggler";
import { useTheme } from "@/shared/utils/useTheme";

export function AppLayout() {
  const { isLight } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-[var(--transition-theme)] bg-[var(--surface)] ${
        isLight ? "theme-light" : "theme-dark"
      }`}
    >
      <main>
        <Outlet />
      </main>

      <div className="fixed bottom-4 right-4 z-40">
        <ThemeToggler className="shadow-lg" />
      </div>
    </div>
  );
}
