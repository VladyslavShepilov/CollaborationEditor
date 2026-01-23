interface FadeLayerProps {
  children: React.ReactNode;
  visible: boolean;
}

export function FadeLayer({ children, visible }: FadeLayerProps) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none transition-opacity duration-[var(--transition-theme)] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
