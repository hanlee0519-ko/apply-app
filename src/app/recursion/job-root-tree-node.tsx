"use client";

import { Suspense, useState } from "react";
import { createRootResource, JobCatalogItem } from "./api/jobCatalogApi";
import JobTreeNode from "./job-tree-node";

type RootResource = { read: () => JobCatalogItem[] };

const rootResource: RootResource = createRootResource();

function JobTreeContent({ onSelect }: { onSelect: (name: string) => void }) {
  const rootNodeArr = rootResource.read();

  return (
    <>
      {rootNodeArr.map((rootNode) => (
        <JobTreeNode key={rootNode.id} node={rootNode} onSelect={onSelect} />
      ))}
    </>
  );
}

export default function JobRootTreeNode() {
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const handleSelect = (nodeName: string) => {
    setSelectedPosition(nodeName);
  };

  return (
    <section>
      {selectedPosition && (
        <div className="m-4">
          <span className="p-2 bg-yellow-200 text-2xl font-bold">
            {`지원 포지션: ${selectedPosition}`}
          </span>
        </div>
      )}

      <Suspense
        fallback={
          <article className="p-4">
            <p>루트 노드 로딩 중...</p>
            <p>루트 노드 로딩 중...</p>
            <p>루트 노드 로딩 중...</p>
          </article>
        }
      >
        <JobTreeContent onSelect={handleSelect} />
      </Suspense>
    </section>
  );
}
