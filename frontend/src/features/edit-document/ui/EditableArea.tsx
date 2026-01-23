interface EditableAreaProps {
  initialContent: string;
  onContentChange: (content: string) => void;
}

export function EditableArea({
  initialContent,
  onContentChange,
}: EditableAreaProps) {
  return (
    <div
      className="min-h-screen w-full p-6 flex justify-center"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div
        className="w-[80%] min-h-[95vh] rounded-lg p-8 text-left outline-none border"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          onContentChange(e.currentTarget.innerText);
        }}
      >
        {initialContent}
      </div>
    </div>
  );
}
