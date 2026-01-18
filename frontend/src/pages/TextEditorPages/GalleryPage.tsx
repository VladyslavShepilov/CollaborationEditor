import { GalleryItem } from "@/widgets/text-editor/ui/GalleryItem";

export function GalleryPage() {
  return (
    <div>
      <h1>Gallery</h1>
      <GalleryItem
        image="https://via.placeholder.com/150"
        title="Title"
        description="Description"
      />
    </div>
  );
}
