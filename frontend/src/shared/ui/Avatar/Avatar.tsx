import { ImageCircle } from "../ImageCircle";
import type { AvatarProps } from "./types";
import { SIZE_MAP } from "./types";

export function Avatar({ src, altDescription, size = "md" }: AvatarProps) {
  return (
    <div
      className={`
        inline-flex
        items-center
        justify-center
        border
        border-[(--border-avatar)]
        rounded-lg
        ${SIZE_MAP[size]}
    `}
    >
      <ImageCircle src={src} altDescription={altDescription} />
    </div>
  );
}
