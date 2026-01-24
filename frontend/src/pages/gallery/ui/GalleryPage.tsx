import { useNavigate } from "react-router";
import { DocumentCard } from "@/entities/document";
import { CreateDocumentButton } from "@/features/create-document";
import { Avatar } from "@/shared/ui/Avatar/Avatar";

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
        <h1 className="text-2xl font-bold text-text-primary">Documents</h1>
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
        <Avatar src="https://camo.githubusercontent.com/5e45bc648dba68520ce949a53690af6bcef2880f84a1d46cbb1636649afd6d84/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d313032312e6a7067" />
      </div>
    </div>
  );
}
