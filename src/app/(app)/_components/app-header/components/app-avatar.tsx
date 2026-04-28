import Image from "next/image";
import { cn } from "@/lib/utils";

const FALLBACK_AVATAR = "/Logos - Institucional/Perfil 3.png";

type AppAvatarProps = {
  src: string | null | undefined;
  alt: string;
  size: number;
  className?: string;
};

export function AppAvatar({ src, alt, size, className }: AppAvatarProps) {
  const resolved = src ?? FALLBACK_AVATAR;
  return (
    <span
      className={cn(
        "shrink-0 overflow-hidden rounded-full ring-1 ring-border",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={resolved}
        alt={alt}
        width={size}
        height={size}
        className="size-full rounded-full object-cover"
      />
    </span>
  );
}
