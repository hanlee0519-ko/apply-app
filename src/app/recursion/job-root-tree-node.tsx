"use client";

import { Suspense, useState } from "react";
import { createRootResource, JobCatalogItem } from "./api/jobCatalogApi";
import JobTreeNode from "./job-tree-node";
import ErrorBoundary from "./error-boundary";

type RootResource = { read: () => JobCatalogItem[] };

const rootResource: RootResource = createRootResource();

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

      <ErrorBoundary fallback={"루드 에러 발생"}>
        <Suspense fallback={"루트 로딩 중..."}>
          <JobTreeContent onSelect={handleSelect} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

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
