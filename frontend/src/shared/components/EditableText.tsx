interface EditableTextProps {
  initialText: string;
  onInput: (text: string) => void;
}

export function EditableText({ initialText, onInput }: EditableTextProps) {
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 flex justify-center">
      <div
        className="w-[80%] min-h-[95vh] bg-white border border-gray-200 rounded-lg p-8 text-black text-left outline-none"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          onInput(e.currentTarget.innerText);
        }}
      >
        {initialText}
      </div>
    </div>
  );
}
