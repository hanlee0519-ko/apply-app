type Experience = {
  id: number;
  title: string;
  period: string;
};

import { useState, useEffect } from "react";

export default function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      title: "",
      period: "",
    },
  ]);

  const [delayExperiences, setDelayExperiences] =
    useState<Experience[]>(experiences);

  const addExperience = () => {
    if (experiences.length < 3) {
      const newId = experiences.length + 1;
      setExperiences([
        ...experiences,
        {
          id: newId,
          title: "",
          period: "",
        },
      ]);
    }
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const updateTitle = (index: number, value: string) => {
    setExperiences((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, title: value } : exp))
    );
  };

  const updatePeriod = (index: number, value: string) => {
    setExperiences((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, period: value } : exp))
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayExperiences(experiences);
    }, 500);

    return () => clearTimeout(timer);
  }, [experiences]);

  return {
    experiences,
    delayExperiences,
    addExperience,
    removeExperience,
    updateTitle,
    updatePeriod,
  };
}
