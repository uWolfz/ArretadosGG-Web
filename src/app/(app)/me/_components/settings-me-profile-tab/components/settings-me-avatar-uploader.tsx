"use client";

import Image from "next/image";
import { UploadIcon } from "lucide-react";
import { toast } from "@/components/ui/toast-mock";

type SettingsMeAvatarUploaderProps = {
  avatarSrcSettingsMe: string;
};

export function SettingsMeAvatarUploader({
  avatarSrcSettingsMe,
}: SettingsMeAvatarUploaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-16 overflow-hidden rounded-full bg-card p-0.5 ring-1 ring-border">
        <Image
          src={avatarSrcSettingsMe}
          alt=""
          width={64}
          height={64}
          className="size-full rounded-full object-cover"
        />
      </div>
      <button
        type="button"
        onClick={() => toast("Upload de avatar em breve")}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75 hover:text-foreground"
      >
        <UploadIcon className="size-3.5" aria-hidden="true" />
        Enviar foto
      </button>
    </div>
  );
}
