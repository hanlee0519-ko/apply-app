"use client";

import { Suspense, useState, useEffect } from "react";
import { JobCatalogItem, createChildrenResource } from "./api/jobCatalogApi";

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
        <Suspense
          fallback={
            <article className="ml-5">
              <p>노드 로딩 중...</p>
              <p>노드 로딩 중...</p>
              <p>노드 로딩 중...</p>
            </article>
          }
        >
          <ChildrenList resource={childrenResource} onSelect={onSelect} />
        </Suspense>
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
