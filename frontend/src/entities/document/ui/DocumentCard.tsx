interface DocumentCardProps {
  id: string;
  title: string;
  description: string;
  previewImage?: string;
  onClick?: (id: string) => void;
}

export function DocumentCard({
  id,
  title,
  description,
  previewImage,
  onClick,
}: DocumentCardProps) {
  return (
    <div
      onClick={() => onClick?.(id)}
      className="aspect-square w-full rounded-xl p-4 flex flex-col items-center justify-between gap-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex-1 flex items-center justify-center overflow-hidden rounded-lg w-full">
        {previewImage ? (
          <img
            className="w-full h-full object-cover rounded-lg"
            src={previewImage}
            alt={title}
          />
        ) : (
          <div
            className="w-full h-full rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--surface-alt)" }}
          >
            <span style={{ color: "var(--text-muted)" }}>No preview</span>
          </div>
        )}
      </div>
      <div className="w-full text-center space-y-1">
        <h2
          className="font-semibold text-sm sm:text-base truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
        <p
          className="text-xs sm:text-sm truncate"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
