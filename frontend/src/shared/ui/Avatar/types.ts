import type { CircleImageProps } from "../ImageCircle";

type SizeVariant = "sm" | "md" | "lg";

export const SIZE_MAP = {
  sm: "w-[var(--size-avatar-sm)] h-[var(--size-avatar-sm)]",
  md: "w-[var(--size-avatar-md)] h-[var(--size-avatar-md)]",
  lg: "w-[var(--size-avatar-lg)] h-[var(--size-avatar-lg)]",
};

export interface AvatarProps extends CircleImageProps {
  size?: SizeVariant;
}
