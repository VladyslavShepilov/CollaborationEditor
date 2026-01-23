import { useNavigate } from "react-router";
import { DocumentCard } from "@/entities/document";
import { CreateDocumentButton } from "@/features/create-document";

export function GalleryPage() {
  const navigate = useNavigate();

  const handleDocumentClick = (id: string) => {
    navigate(`/editor/${id}`);
  };

  const handleCreateDocument = (title: string, description: string) => {
    console.log(title, description);
    // TODO: Save to backend/state
    const newId = Date.now().toString();
    navigate(`/editor/${newId}`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Documents
        </h1>
        <CreateDocumentButton onCreate={handleCreateDocument} />
      </div>

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
