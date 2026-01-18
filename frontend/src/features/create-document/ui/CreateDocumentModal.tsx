import { useState } from "react";
import { useTheme } from "@/shared/utils/useTheme";

interface CreateDocumentModalProps {
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

export function CreateDocumentModal({
  onClose,
  onCreate,
}: CreateDocumentModalProps) {
  const { isDark } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title, description);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-xl p-6 shadow-xl ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Create New Document
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title"
              autoFocus
              className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
