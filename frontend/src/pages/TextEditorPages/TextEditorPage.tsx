import { useRef } from "react";
import { EditableText } from "@/widgets/text-editor";

export function TextEditorPage() {
  const textRef = useRef<string>("");

  return (
    <EditableText initialText="" onInput={(text) => (textRef.current = text)} />
  );
}
