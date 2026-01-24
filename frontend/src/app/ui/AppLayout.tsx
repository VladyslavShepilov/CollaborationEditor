import { Outlet } from "react-router";
import { ThemeToggler } from "@/features/theme-toggler";

export function AppLayout() {
  return (
    <div className="min-h-screen transition-colors duration-(--transition-theme) bg-surface">
      <main>
        <Outlet />
      </main>

      <div className="fixed bottom-4 right-4 z-40">
        <ThemeToggler className="shadow-lg" />
      </div>
    </div>
  );
}
