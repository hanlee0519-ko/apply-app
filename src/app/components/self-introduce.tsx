"use client";

import { useState } from "react";

export default function SelfIntroduce() {
  const [introduction, setIntroduction] = useState<string>("");

  const maxLength = 300;
  const characterCount = introduction.length;
  const isAtLimit = characterCount === maxLength;

  const handleIntroductionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    if (value.length <= maxLength) setIntroduction(value);
  };

  return (
    <div className="p-4">
      <h1>
        <strong>자기소개</strong>
      </h1>
      <article>
        <form>
          <fieldset>
            <label>
              <textarea
                value={introduction}
                onChange={handleIntroductionChange}
                placeholder="자기소개를 입력해 주세요."
              />
            </label>

            <footer>
              {isAtLimit && <p>{"300자 이내로 입력해 주세요."}</p>}
              <p>
                {characterCount} / {maxLength}
              </p>
            </footer>
          </fieldset>
        </form>
      </article>
    </div>
  );
}
