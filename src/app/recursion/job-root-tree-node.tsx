"use client";

import { useEffect, useState } from "react";
import { jobCatalogApi, JobCatalogItem } from "./api/jobCatalogApi";
import JobTreeNode from "./job-tree-node";

export default function JobRootTreeNode() {
  const [rootNodeArr, setRootNodeArr] = useState<JobCatalogItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getRootNode = async () => {
      try {
        const response = await jobCatalogApi.getRoot();
        setRootNodeArr(response);
      } catch (err) {
        setError(err as Error);
      }
    };

    getRootNode();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section>
      {error && <p>에러발생: 루트노드</p>}
      {rootNodeArr.map((rootNode) => (
        <JobTreeNode key={rootNode.id} node={rootNode} />
      ))}
    </section>
  );
}
