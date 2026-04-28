import { Suspense } from "react";
import { SettingsMeContent } from "./_components/settings-me-content/settings-me-content";

export default function MePage() {
  return (
    <Suspense fallback={null}>
      <SettingsMeContent />
    </Suspense>
  );
}
