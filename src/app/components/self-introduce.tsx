"use client";

import { useEffect, useState } from "react";
import SelfIntroduceArea from "./self-introduce-area";
import PreviewSelfIntroduce from "./preview-self-introduce";

export default function SelfIntroduce() {
  const [introduction, setIntroduction] = useState<string>("");
  const [delayIntroduction, setDelayIntroduction] = useState<string>("");
  const maxLength = 300;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= maxLength) setIntroduction(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayIntroduction(introduction);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [introduction]);

  return (
    <div className="flex">
      <PreviewSelfIntroduce delayIntroduction={delayIntroduction} />
      <SelfIntroduceArea
        introduction={introduction}
        maxLength={maxLength}
        onChange={handleChange}
      />
    </div>
  );
}
