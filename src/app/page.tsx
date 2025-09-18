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
      <main className="w-screen h-screen">
        <SelfIntroduce />
      </main>
    </div>
  );
}
