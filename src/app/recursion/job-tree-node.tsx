"use client";

import { Suspense, useState, useEffect } from "react";
import { JobCatalogItem, createChildrenResource } from "./api/jobCatalogApi";
import ErrorBoundary from "./error-boundary";

interface TreeNodeProps {
  node: JobCatalogItem;
  onSelect?: (nodeName: string) => void;
}

type ChildrenResource = { read: () => JobCatalogItem[] };

export default function JobTreeNode({ node, onSelect }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [childrenResource, setChildrenResource] =
    useState<ChildrenResource | null>(null);

  const isLeaf = node.isLeaf;
  const nodeIcon = isLeaf ? "▷" : isOpen ? "▼" : "▶";

  const handleSelect = () => onSelect?.(node.name);
  const handleClick = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isLeaf && isOpen && !childrenResource) {
      setChildrenResource(createChildrenResource(node.id));
    }
  }, [isOpen, isLeaf, childrenResource, node.id]);

  return (
    <article className="ml-5">
      <span
        onClick={isLeaf ? handleSelect : handleClick}
        className="cursor-pointer hover:text-blue-600"
      >
        {nodeIcon} {node.name}
      </span>

      {!isLeaf && isOpen && childrenResource && (
        <ErrorBoundary fallback={"노드 에러 발생"}>
          <Suspense fallback={<p className="p-4">{"노드 로딩 중..."}</p>}>
            <ChildrenList resource={childrenResource} onSelect={onSelect} />
          </Suspense>
        </ErrorBoundary>
      )}
    </article>
  );
}

function ChildrenList({
  resource,
  onSelect,
}: {
  resource: ChildrenResource;
  onSelect?: (nodeName: string) => void;
}) {
  const childrenArr = resource.read();

  return (
    <section>
      {childrenArr.map((childNode) => (
        <JobTreeNode key={childNode.id} node={childNode} onSelect={onSelect} />
      ))}
    </section>
  );
}
