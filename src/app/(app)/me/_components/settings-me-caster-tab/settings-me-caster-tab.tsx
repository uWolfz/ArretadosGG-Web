"use client";

import { useState } from "react";
import type { Player } from "@/app/(app)/_data/players";
import {
  findCasterApplicationByPlayerTag,
  type CasterApplication,
} from "@/app/(app)/_data/caster-applications";
import { findCasterByPlayerTag } from "@/app/(app)/_data/casters";
import { SettingsMeCasterEmptyState } from "./components/settings-me-caster-empty-state";
import { SettingsMeCasterPendingCard } from "./components/settings-me-caster-pending-card";
import { SettingsMeCasterRejectedCard } from "./components/settings-me-caster-rejected-card";
import { SettingsMeCasterApprovedEdit } from "./components/settings-me-caster-approved-edit";
import { SettingsMeCasterApplicationWizard } from "./components/settings-me-caster-application-wizard/settings-me-caster-application-wizard";

type SettingsMeCasterTabProps = {
  userSettingsMe: Player;
};

export function SettingsMeCasterTab({
  userSettingsMe,
}: SettingsMeCasterTabProps) {
  const [applicationCasterTab, setApplicationCasterTab] = useState<
    CasterApplication | undefined
  >(() => findCasterApplicationByPlayerTag(userSettingsMe.tag));
  const [wizardOpenCasterTab, setWizardOpenCasterTab] = useState(false);

  const casterEntityCasterTab = findCasterByPlayerTag(userSettingsMe.tag);

  function handleOpenWizardCasterTab() {
    setWizardOpenCasterTab(true);
  }

  function handleCloseWizardCasterTab() {
    setWizardOpenCasterTab(false);
  }

  function handleSubmittedApplicationCasterTab(
    submitted: CasterApplication,
  ) {
    setApplicationCasterTab(submitted);
    setWizardOpenCasterTab(false);
  }

  if (wizardOpenCasterTab) {
    return (
      <SettingsMeCasterApplicationWizard
        userSettingsMe={userSettingsMe}
        onCancelCasterWizard={handleCloseWizardCasterTab}
        onSubmittedCasterWizard={handleSubmittedApplicationCasterTab}
      />
    );
  }

  if (casterEntityCasterTab) {
    return (
      <SettingsMeCasterApprovedEdit
        userSettingsMe={userSettingsMe}
        casterCasterTab={casterEntityCasterTab}
      />
    );
  }

  if (!applicationCasterTab) {
    return (
      <SettingsMeCasterEmptyState
        onApplyCasterTab={handleOpenWizardCasterTab}
      />
    );
  }

  if (applicationCasterTab.status === "pending") {
    return (
      <SettingsMeCasterPendingCard
        applicationCasterTab={applicationCasterTab}
      />
    );
  }

  if (applicationCasterTab.status === "rejected") {
    return (
      <SettingsMeCasterRejectedCard
        applicationCasterTab={applicationCasterTab}
        onReapplyCasterTab={handleOpenWizardCasterTab}
      />
    );
  }

  // status === "approved" mas sem Caster entry ainda (edge case: aprovada mas
  // entidade não criada pelo mock) — fallback mostra pending visual.
  return (
    <SettingsMeCasterPendingCard
      applicationCasterTab={applicationCasterTab}
    />
  );
}
