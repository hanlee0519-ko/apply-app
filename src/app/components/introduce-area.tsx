type SelfIntroduceAreaProps = {
  introduction: string;
  maxLength: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function SelfIntroduceArea({
  introduction,
  maxLength,
  onChange,
}: SelfIntroduceAreaProps) {
  const characterCount = introduction.length;

  return (
    <section className="w-[40%] p-4">
      <h1 className="text-xl font-bold">간단한 자기소개</h1>
      <div className="m-2">
        <textarea
          className="w-full h-[150px]"
          value={introduction}
          onChange={onChange}
          placeholder="자기소개를 입력해 주세요."
        />

        <div className="text-right m-2">
          <p>
            {characterCount} / {maxLength}
          </p>
        </div>
      </div>
    </section>
  );
}
