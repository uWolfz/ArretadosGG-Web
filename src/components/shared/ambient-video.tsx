"use client";

import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type AmbientVideoProps = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function AmbientVideo({
  src,
  poster,
  alt,
  className,
  priority = false,
  sizes = "100vw",
}: AmbientVideoProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <video
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
