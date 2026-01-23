import { Outlet } from "react-router";
import { ThemeToggler } from "@/features/theme-toggler";
import { useTheme } from "@/shared/utils/useTheme";

export function AppLayout() {
  const { isLight } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors ${
        isLight ? "theme-light" : "theme-dark"
      }`}
      style={{
        backgroundColor: "var(--surface)",
        transitionDuration: "var(--transition-theme)",
      }}
    >
      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Theme toggler - fixed bottom right */}
      <div className="fixed bottom-4 right-4 z-40">
        <ThemeToggler
          className="shadow-lg"
          lightBackground={
            <div
              className="w-full h-full rounded"
              style={{ backgroundColor: "var(--color-accent-soft-light)" }}
            />
          }
          darkBackground={
            <div
              className="w-full h-full rounded"
              style={{ backgroundColor: "var(--color-accent-soft-dark)" }}
            />
          }
        />
      </div>
    </div>
  );
}
