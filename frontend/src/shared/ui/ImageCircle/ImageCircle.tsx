import type { CircleImageProps } from "./types";

export function ImageCircle({
  src,
  altDescription = "Undefined",
}: CircleImageProps) {
  return (
    <img
      src={src}
      alt={altDescription}
      className="w-full h-full rounded-full object-cover"
    />
  );
}
