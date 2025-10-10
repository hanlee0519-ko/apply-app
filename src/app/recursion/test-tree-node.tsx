"use client";

type TESTNodeProps = {
  node: JobCatalogItem;
  onSelect: (node: string) => void;
};

import { useState, useEffect } from "react";
import { type JobCatalogItem, jobCatalogApi } from "./api/jobCatalogApi";

export default function TESTNode({ node, onSelect }: TESTNodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nodeChildArr, setNodeChildArr] = useState<JobCatalogItem[] | []>([]);
  const [isError, setIsError] = useState<Error | null>(null);

  const isLeaf = node.isLeaf;
  const nodeIcon = isLeaf ? "▷" : isOpen ? "▼" : "►";

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const hanldeSelect = () => {
    onSelect(node.name);
  };

  useEffect(() => {
    const getChildren = async () => {
      try {
        const response = await jobCatalogApi.getChildrenByParentId(node.id);
        setNodeChildArr(response);
      } catch (error) {
        if (error instanceof Error) {
          setIsError(error);
        } else {
          setIsError(new Error("Unknown Error"));
        }
      }
    };
    if (isOpen && nodeChildArr.length === 0 && !isLeaf) {
      getChildren();
    }
  }, [node.id, isOpen, isLeaf, nodeChildArr.length]);

  if (isError) return <article>{`${isError.message} 발생`}</article>;

  return (
    <article className="ml-10 cursor-pointer">
      <span onClick={isLeaf ? hanldeSelect : handleClick}>
        {nodeIcon} {node.name}
      </span>
      {isOpen &&
        nodeChildArr.map((node) => (
          <TESTNode key={node.id} node={node} onSelect={onSelect} />
        ))}
    </article>
  );
}
