"use client";

import { useEffect, useState } from "react";
import { jobCatalogApi, JobCatalogItem } from "./api/jobCatalogApi";
import Tree from "./compound-tree-node";
import TESTNode from "./test-tree-node";

export default function JobRootTreeNode() {
  const [rootNodeArr, setRootNodeArr] = useState<JobCatalogItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const handleSelect = (nodeName: string) => {
    setSelectedPosition(nodeName);
  };

  console.log("Position Type", Boolean(selectedPosition), selectedPosition);

  useEffect(() => {
    const getRootNode = async () => {
      try {
        const response = await jobCatalogApi.getRoot();
        setRootNodeArr(response);
      } catch (error) {
        setError(error as Error);
      }
    };

    getRootNode();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section>
      {selectedPosition && <h1>{selectedPosition}</h1>}
      {rootNodeArr.map((rootNode) => (
        <TESTNode key={rootNode.id} node={rootNode} onSelect={handleSelect} />
      ))}
    </section>
  );
}
