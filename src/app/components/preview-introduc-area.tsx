type PreviewSelfIntroAreaProps = {
  delayIntroduction: string;
};

export default function PreviewIntroduceArea({
  delayIntroduction,
}: PreviewSelfIntroAreaProps) {
  return (
    <section className="w-[60%] bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-5">미리보기</h1>
      <p>{delayIntroduction}</p>
    </section>
  );
}
