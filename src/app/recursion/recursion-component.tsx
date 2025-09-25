"use client";

import { useState } from "react";
import { nodeItem } from "./mock-data";

type nodeProps = {
  node: nodeItem;
};

export default function RecursionComponent({ node }: nodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const icon = node.type === "folder" ? "▶︎" : "▷";
  const isChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="ml-10">
      <span className="cursor-pointer p-2" onClick={handleClick}>
        {isOpen ? "▼" : icon}
      </span>
      <span className={node.type === "folder" ? "font-bold" : ""}>
        {node.name}
      </span>
      {isOpen &&
        isChildren &&
        node.children?.map((node) => (
          <RecursionComponent key={node.name} node={node} />
        ))}
    </div>
  );
}
