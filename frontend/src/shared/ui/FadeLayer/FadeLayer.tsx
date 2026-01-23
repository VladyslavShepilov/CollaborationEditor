interface FadeLayerProps {
  children: React.ReactNode;
  visible: boolean;
}

export function FadeLayer({ children, visible }: FadeLayerProps) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none transition-opacity ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: "var(--transition-theme)" }}
    >
      {children}
    </div>
  );
}
