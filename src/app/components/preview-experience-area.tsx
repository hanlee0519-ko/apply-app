type Experience = {
  id: number;
  title: string;
  period: string;
};

type PreviewExperienceArea = {
  delayExperiences: Experience[];
};

export default function PreviewExperienceArea({
  delayExperiences,
}: PreviewExperienceArea) {
  return (
    <section className="w-[60%] bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-5">직무경험</h1>
      <ul>
        {delayExperiences.map((exp, index) => (
          <article key={`exp-${index + 1}`} className="mb-4">
            <h2 className="text-xl font-bold mb-2">{`직무경험 : ${
              index + 1
            }`}</h2>
            <p className="border-2 p-1 mb-1 h-[30px]">{exp.title}</p>
            <p className="border-2 p-1 mb-1 h-[30px]">{exp.period}</p>
          </article>
        ))}
      </ul>
    </section>
  );
}
