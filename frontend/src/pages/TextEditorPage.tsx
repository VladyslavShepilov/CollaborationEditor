import { useRef } from "react";
import { EditableText } from "@/shared/components/EditableText";

export function TextEditorPage() {
  const textRef = useRef<string>("Hello, world!");

  return (
    <EditableText
      initialText="Hello, world!"
      onInput={(text) => (textRef.current = text)}
    />
  );
}
