interface FadeLayerProps {
  children: React.ReactNode;
  visible: boolean;
  transitionDurationMs?: number;
}

export function FadeLayer({
  children,
  visible,
  transitionDurationMs = 400,
}: FadeLayerProps) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none transition-opacity ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: `${transitionDurationMs}ms` }}
    >
      {children}
    </div>
  );
}
