"use client";

import { useState } from "react";

export default function SelfIntroduce() {
  const [introduction, setIntroduction] = useState<string>("");

  const maxLength = 300;
  const characterCount = introduction.length;
  const isAtLimit = characterCount === maxLength;

  const handleIntroductionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value.length <= maxLength) setIntroduction(value);
  };

  return (
    <section>
      <h1 className="text-xl font-bold">간단한 자기소개</h1>
      <div className="m-2">
        <input
          className="w-full h-[150px]"
          value={introduction}
          onChange={handleIntroductionChange}
          placeholder="자기소개를 입력해 주세요."
        />

        <footer className="text-right m-2">
          {isAtLimit && <p>{"300자 이내로 입력해 주세요."}</p>}
          <p>
            {characterCount} / {maxLength}
          </p>
        </footer>
      </div>
    </section>
  );
}
