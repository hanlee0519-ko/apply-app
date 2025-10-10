"use client";

import { useEffect, useState } from "react";
import { jobCatalogApi, JobCatalogItem } from "./api/jobCatalogApi";
import JobCatalog from "./compound-job-catalog";

export default function JobRootTreeNode() {
  const [rootNodeArr, setRootNodeArr] = useState<JobCatalogItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const handleSelect = (nodeName: string) => {
    setSelectedPosition(nodeName);
  };

  useEffect(() => {
    const getRootNode = async () => {
      try {
        const response = await jobCatalogApi.getRoot();
        setRootNodeArr(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("알수없는 에러 발생"));
        }
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
        <JobCatalog key={rootNode.id} node={rootNode} onSelect={handleSelect} />
      ))}
    </section>
  );
}
