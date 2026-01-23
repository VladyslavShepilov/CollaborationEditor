import { useState } from "react";
import { CreateDocumentModal } from "./CreateDocumentModal";

interface CreateDocumentButtonProps {
  onCreate: (title: string, description: string) => void;
}

export function CreateDocumentButton({ onCreate }: CreateDocumentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors hover:opacity-90"
        style={{
          backgroundColor: "var(--accent)",
          color: "white",
        }}
      >
        <span className="text-xl leading-none">+</span>
        New Document
      </button>

      <CreateDocumentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={onCreate}
      />
    </>
  );
}
