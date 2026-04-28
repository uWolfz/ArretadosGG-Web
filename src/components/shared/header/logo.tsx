import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority = true }: LogoProps) {
  return (
    <Image
      src="/Logos - Institucional/Logo Arretados.png"
      alt="Arretados"
      width={2840}
      height={2708}
      priority={priority}
      className={cn("h-12 w-auto", className)}
    />
  );
}
