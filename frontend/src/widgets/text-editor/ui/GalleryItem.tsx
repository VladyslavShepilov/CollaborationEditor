import { useTheme } from "@/shared/utils/useTheme";

interface GalleryItemProps {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function GalleryItem({
  image,
  title,
  description,
  onClick,
}: GalleryItemProps) {
  const { isDark } = useTheme();

  return (
    <div
      onClick={onClick}
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
        <img
          className="w-full h-full object-cover rounded-lg"
          src={image}
          alt={title}
        />
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
