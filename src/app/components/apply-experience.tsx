"use client";

import { useState } from "react";

interface Experience {
  id: number;
  title: string;
  period: string;
}

export default function ApplyExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      title: "",
      period: "",
    },
  ]);

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

  return (
    <section>
      <h1 className="text-xl font-bold mb-2">직무 관련 경험</h1>

      <ul className="space-y-6">
        {experiences.map((experience, index) => (
          <li key={`experience-${index}`}>
            <div className="flex justify-between">
              <h2>관련 경험 {index + 1}</h2>
              {experiences.length > 1 && (
                <button
                  onClick={() => removeExperience(index)}
                  className="bg-gray-200 p-1 rounded-md"
                >
                  삭제
                </button>
              )}
            </div>

            <label>제목</label>
            <input
              type="text"
              value={experience.title}
              onChange={(e) => updateTitle(index, e.target.value)}
              className="border-1 w-full p-1 focus:outline-none"
            />

            <label>근무 기간</label>
            <input
              type="text"
              value={experience.period}
              onChange={(e) => updatePeriod(index, e.target.value)}
              className="border-1 w-full p-1 focus:outline-none"
            />
          </li>
        ))}
      </ul>

      {experiences.length < 3 && (
        <div className="flex justify-center my-2">
          <button
            onClick={addExperience}
            className="w-full bg-blue-500 text-white p-2 font-bold rounded-md"
          >
            추가하기
          </button>
        </div>
      )}
    </section>
  );
}
