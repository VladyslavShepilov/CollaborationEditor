import { GalleryItem } from "@/widgets/text-editor/ui/GalleryItem";

export function GalleryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gallery</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <GalleryItem
            key={i}
            image="https://via.placeholder.com/150"
            title={`Document ${i + 1}`}
            description="Description"
          />
        ))}
      </div>
    </div>
  );
}
