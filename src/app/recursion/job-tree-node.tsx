"use client";

import { useState, useEffect } from "react";
import { jobCatalogApi, JobCatalogItem } from "./api/jobCatalogApi";

interface TreeNodeProps {
  node: JobCatalogItem;
}

export default function JobTreeNode({ node }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [childrenArr, setChildrenArr] = useState<JobCatalogItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const isLeaf = node.isLeaf;
  const icon = isLeaf ? "▷" : isOpen ? "▼" : "▶";

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const children = await jobCatalogApi.getChildrenByParentId(node.id);
        setChildrenArr(children);
      } catch (err) {
        setError(err as Error);
      }
    };

    if (!isLeaf && isOpen && childrenArr.length === 0) {
      getChildren();
    }
  }, [isOpen, isLeaf, childrenArr.length, node.id]);

  return (
    <article className="ml-5">
      <span onClick={handleToggle} className="cursor-pointer">
        {icon} {node.name}
      </span>

      {isOpen && (
        <section>
          {error && <p>에러발생 : 트리노드</p>}
          {childrenArr.map((childNode) => (
            <JobTreeNode key={childNode.id} node={childNode} />
          ))}
        </section>
      )}
    </article>
  );
}
