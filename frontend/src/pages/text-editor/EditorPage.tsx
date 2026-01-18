import { useRef } from "react";
import { useParams } from "react-router";
import { EditableArea } from "@/features/edit-document";

export function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const contentRef = useRef<string>("");

  return (
    <EditableArea
      initialContent={`Editing document ${id}`}
      onContentChange={(content) => {
        contentRef.current = content;
      }}
    />
  );
}
