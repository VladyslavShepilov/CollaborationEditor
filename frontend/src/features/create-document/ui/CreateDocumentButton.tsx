import { useState } from "react";
import { useTheme } from "@/shared/utils/useTheme";
import { CreateDocumentModal } from "./CreateDocumentModal";

interface CreateDocumentButtonProps {
  onCreate: (title: string, description: string) => void;
}

export function CreateDocumentButton({ onCreate }: CreateDocumentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
          isDark
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        <span className="text-xl leading-none">+</span>
        New Document
      </button>

      {isOpen && (
        <CreateDocumentModal
          onClose={() => setIsOpen(false)}
          onCreate={onCreate}
        />
      )}
    </>
  );
}
