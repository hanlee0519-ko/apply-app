"use client";

import useExperiences from "../hooks/use-experience";
import ExperienceArea from "./experience-area";
import PreviewExperienceArea from "./preview-experience-area";

export default function ApplyExperience() {
  const {
    experiences,
    delayExperiences,
    addExperience,
    removeExperience,
    updateTitle,
    updatePeriod,
  } = useExperiences();

  return (
    <div className="flex">
      <PreviewExperienceArea delayExperiences={delayExperiences} />
      <ExperienceArea
        experiences={experiences}
        onAdd={addExperience}
        onRemove={removeExperience}
        onUpdateTitle={updateTitle}
        onUpdatePeriod={updatePeriod}
      />
    </div>
  );
}
