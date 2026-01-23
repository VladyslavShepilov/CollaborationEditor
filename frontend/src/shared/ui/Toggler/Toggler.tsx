import type { TogglerProps } from "./types";

export function Toggler({ checked, onChange, disabled = false }: TogglerProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label="Toggle theme"
        className="sr-only peer"
      />

      <span
        className="relative h-7 w-12 rounded-full transition-colors"
        style={{
          backgroundColor: checked
            ? "var(--color-accent-soft-light)"
            : "var(--color-surface-alt-dark)",
          transitionDuration: "var(--transition-theme)",
        }}
      >
        {/* Thumb */}
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center text-xs ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
          style={{ transitionDuration: "var(--transition-theme)" }}
        >
          {checked ? "☀️" : "🌙"}
        </span>
      </span>
    </label>
  );
}
