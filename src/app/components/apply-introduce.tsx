"use client";

import SelfIntroduceArea from "./introduce-area";
import PreviewSelfIntroduceArea from "./preview-introduc-area";
import useIntroduce from "../hooks/use-introduce";

export default function ApplyIntroduce() {
  const { introduction, delayIntroduction, handleChange, maxLength } =
    useIntroduce();

  return (
    <div className="flex">
      <PreviewSelfIntroduceArea delayIntroduction={delayIntroduction} />
      <SelfIntroduceArea
        introduction={introduction}
        maxLength={maxLength}
        onChange={handleChange}
      />
    </div>
  );
}
