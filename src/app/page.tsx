import ApplyPosition from "./components/apply-position";
import SelfIntroduce from "./components/self-introduce";

export default function Home() {
  return (
    <div>
      <header>
        <h1>신규지원하기</h1>
        <button>제출하기</button>
      </header>
      <main>
        <section>
          <h1>Area : 미리보기</h1>
        </section>
        <section>
          <SelfIntroduce />
          <ApplyPosition />
          <article>직무경혐</article>
        </section>
      </main>
    </div>
  );
}
