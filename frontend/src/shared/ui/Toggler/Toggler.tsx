import type { TogglerProps } from "./types";

export function Toggler({
  checked,
  onChange,
  disabled = false,
  transitionColors = {
    light: "bg-amber-200",
    dark: "bg-blue-800",
  },
}: TogglerProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label="Toggle theme"
        className="sr-only"
      />

      <span
        className={`h-6 w-11 rounded-full transition-colors ${
          checked ? transitionColors.light : transitionColors.dark
        }`}
      />
    </label>
  );
}
