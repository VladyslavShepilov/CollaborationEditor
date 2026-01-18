import { useTheme } from "@/shared/utils/useTheme";

interface EditableTextProps {
  initialText: string;
  onInput: (text: string) => void;
}

export function EditableText({ initialText, onInput }: EditableTextProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen w-full p-6 flex justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-[80%] min-h-[95vh] rounded-lg p-8 text-left outline-none ${
          isDark
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        } border`}
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
