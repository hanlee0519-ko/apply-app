type Experience = {
  id: number;
  title: string;
  period: string;
};

type ExperienceAreaProps = {
  experiences: Experience[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdateTitle: (index: number, value: string) => void;
  onUpdatePeriod: (index: number, value: string) => void;
};

export default function ExperienceArea({
  experiences,
  onAdd,
  onRemove,
  onUpdateTitle,
  onUpdatePeriod,
}: ExperienceAreaProps) {
  return (
    <section className="w-[40%] p-4">
      <h1 className="text-xl font-bold mb-2">직무 관련 경험</h1>

      <ul className="space-y-6">
        {experiences.map((experience, index) => (
          <li key={`experience-${index}`}>
            <div className="flex justify-between">
              <h2>관련 경험 {index + 1}</h2>
              {experiences.length > 1 && (
                <button
                  onClick={() => onRemove(index)}
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
              onChange={(e) => onUpdateTitle(index, e.target.value)}
              className="border-1 w-full p-1 focus:outline-none"
            />

            <label>근무 기간</label>
            <input
              type="text"
              value={experience.period}
              onChange={(e) => onUpdatePeriod(index, e.target.value)}
              className="border-1 w-full p-1 focus:outline-none"
            />
          </li>
        ))}
      </ul>

      {experiences.length < 3 && (
        <div className="flex justify-center my-2">
          <button
            onClick={onAdd}
            className="w-full bg-blue-500 text-white p-2 font-bold rounded-md"
          >
            추가하기
          </button>
        </div>
      )}
    </section>
  );
}
