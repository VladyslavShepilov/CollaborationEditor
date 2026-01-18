import { useNavigate } from "react-router";
import { DocumentCard } from "@/entities/document";
import { useTheme } from "@/shared/utils/useTheme";

export function GalleryPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleDocumentClick = (id: string) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div
      className={`min-h-screen p-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <h1
        className={`text-2xl font-bold mb-6 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Documents
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <DocumentCard
            key={i}
            id={String(i + 1)}
            title={`Document ${i + 1}`}
            description="Click to edit"
            onClick={handleDocumentClick}
          />
        ))}
      </div>
    </div>
  );
}
