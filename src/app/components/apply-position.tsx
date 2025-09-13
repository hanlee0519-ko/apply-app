"use client";

import { useState } from "react";

export default function ApplyPosition() {
  const [selectedField, setSelectedField] = useState<string>("");

  const fieldvalues = ["프론트엔드 개발자", "백엔드 개발자", "풀스택 개발자"];

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
  };

  return (
    <section className="my-5">
      <h1 className="text-xl font-bold">지원하는 포지션 : {selectedField}</h1>
      <form>
        <fieldset>
          <ul>
            {fieldvalues.map((field, index) => (
              <li
                key={`position-${index}`}
                onClick={() => handleFieldSelect(field)}
                className={`
                  cursor-pointer my-1 p-2 rounded-md
                  ${
                    selectedField === field
                      ? "bg-gray-200 text-blue-500"
                      : "text-gray-700"
                  }
                `}
              >
                {field}
              </li>
            ))}
          </ul>
        </fieldset>
      </form>
    </section>
  );
}
