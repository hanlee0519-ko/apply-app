"use client";

import { useState } from "react";

export default function ApplyPosition() {
  const [selectedField, setSelectedField] = useState<string>("");

  const fieldvalues = ["프론트엔드 개발자", "백엔드 개발자", "풀스택 개발자"];

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
  };

  return (
    <div className="p-4">
      <h1>
        <strong>지원하는 포지션 : {selectedField}</strong>
      </h1>
      <form>
        <fieldset>
          <ul>
            {fieldvalues.map((field, index) => (
              <li key={index} onClick={() => handleFieldSelect(field)}>
                {field}
              </li>
            ))}
          </ul>
        </fieldset>
      </form>
    </div>
  );
}
