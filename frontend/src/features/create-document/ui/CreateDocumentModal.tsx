import { useState } from "react";
import { Modal } from "@/shared/ui";

interface CreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

export function CreateDocumentModal({
  isOpen,
  onClose,
  onCreate,
}: CreateDocumentModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title, description);
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Document">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-text-secondary">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document title"
            autoFocus
            className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-emerald-500 bg-surface-alt border-border text-text-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-text-secondary">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description"
            rows={3}
            className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-emerald-500 resize-none bg-surface-alt border-border text-text-primary"
          />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-80 text-text-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90 bg-accent text-white"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
