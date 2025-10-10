"use client";

interface TreeNodeProps {
  node: JobCatalogItem;
}

import { useState, useEffect } from "react";
import { jobCatalogApi, JobCatalogItem } from "./api/jobCatalogApi";

export default function JobTreeNode({ node }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [childrenArr, setChildrenArr] = useState<JobCatalogItem[]>([]);
  const [isError, setIsError] = useState<Error | null>(null);

  const isLeaf = node.isLeaf;
  const icon = isLeaf ? "▷" : isOpen ? "▼" : "▶";

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const children = await jobCatalogApi.getChildrenByParentId(node.id);
        setChildrenArr(children);
      } catch (error) {
        if (error instanceof Error) {
          setIsError(error);
        } else {
          setIsError(new Error("알수없는 에러 발생"));
        }
      }
    };

    if (!isLeaf && isOpen && childrenArr.length === 0) {
      getChildren();
    }
  }, [isOpen, isLeaf, childrenArr.length, node.id]);

  if (isError) {
    return <p>{`Job Tree 에러 ${isError.message}`}</p>;
  }

  return (
    <article className="ml-5">
      <span onClick={handleToggle} className="cursor-pointer">
        {icon} {node.name}
      </span>

      {isOpen && (
        <section>
          {childrenArr.map((childNode) => (
            <JobTreeNode key={childNode.id} node={childNode} />
          ))}
        </section>
      )}
    </article>
  );
}
