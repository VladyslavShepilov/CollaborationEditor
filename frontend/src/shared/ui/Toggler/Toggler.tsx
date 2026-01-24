import type { TogglerProps } from "./types";

export function Toggler({
  checked,
  onChange,
  disabled = false,
  checkedIcon,
  uncheckedIcon,
  ariaLabel = "Toggle",
}: TogglerProps) {
  const trackBg = checked
    ? "bg-[var(--toggle-track-active)]"
    : "bg-[var(--toggle-track)]";

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className="sr-only peer"
      />

      <span
        className={`relative h-7 w-12 rounded-full transition-colors duration-[(--transition-theme)] ${trackBg}`}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-[(--transition-theme)] flex items-center justify-center text-xs ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {checked ? checkedIcon : uncheckedIcon}
        </span>
      </span>
    </label>
  );
}
