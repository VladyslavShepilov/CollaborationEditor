import { useTheme } from "@/shared/utils/useTheme";

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
  const { isDark } = useTheme();

  return (
    <div
      onClick={() => onClick?.(id)}
      className={`
        aspect-square w-full
        rounded-xl p-4
        flex flex-col items-center justify-between gap-2
        cursor-pointer transition-all duration-200
        hover:scale-105 hover:shadow-lg
        ${
          isDark
            ? "bg-gray-800 border border-gray-700 hover:border-gray-600"
            : "bg-white border border-gray-200 hover:border-gray-300 shadow-sm"
        }
      `}
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
            className={`w-full h-full rounded-lg flex items-center justify-center ${
              isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <span className={isDark ? "text-gray-500" : "text-gray-400"}>
              No preview
            </span>
          </div>
        )}
      </div>
      <div className="w-full text-center space-y-1">
        <h2
          className={`font-semibold text-sm sm:text-base truncate ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-xs sm:text-sm truncate ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
