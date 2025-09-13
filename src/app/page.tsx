import ApplyExperience from "./components/apply-experience";
import ApplyPosition from "./components/apply-position";
import SelfIntroduce from "./components/self-introduce";

export default function Home() {
  return (
    <div>
      <header className="flex items-center p-4">
        <h1 className="text-2xl font-bold mr-2">신규지원하기</h1>
        <button className="bg-blue-500 text-white p-2 font-bold rounded-md">
          제출하기
        </button>
      </header>
      <main className="flex h-screen">
        <article className="w-[65%] bg-gray-200 p-4">
          <h1 className="text-2xl font-bold">미리보기</h1>
        </article>
        <article className="w-[35%] p-4">
          <SelfIntroduce />
          <ApplyPosition />
          <ApplyExperience />
        </article>
      </main>
    </div>
  );
}
