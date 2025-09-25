import { mockData } from "./mock-data";
import RecursionComponent from "./recursion-component";

export default function RecursionPage() {
  const nodeItem = mockData;

  return (
    <article className="mt-10">
      <RecursionComponent node={nodeItem} />
    </article>
  );
}
