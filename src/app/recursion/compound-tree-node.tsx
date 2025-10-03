"use client";

type TreeNodeContextType = {
  node: JobCatalogItem;
  isOpen: boolean;
  handleToggle: () => void;
};

type TreeNodeProps = {
  node: JobCatalogItem;
  children: ReactNode;
};

type TreeProps = {
  rootNode: JobCatalogItem;
};

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { jobCatalogApi, JobCatalogItem } from "./api/jobCatalogApi";

const TreeNodeContext = createContext<TreeNodeContextType | null>(null);

function useTreeNodeContext(): TreeNodeContextType {
  const context = useContext(TreeNodeContext);
  if (!context) {
    throw new Error("TreeNode 내부에서만 사용 가능");
  }
  return context;
}

const TreeNode = ({ node, children }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);
  const value: TreeNodeContextType = { node, isOpen, handleToggle };

  return (
    <TreeNodeContext.Provider value={value}>
      <article className="ml-10">{children}</article>
    </TreeNodeContext.Provider>
  );
};

const Name = () => {
  const { node, isOpen, handleToggle } = useTreeNodeContext();
  const icon = node.isLeaf ? "▷" : isOpen ? "▼" : "▶";

  return (
    <span onClick={handleToggle} style={{ cursor: "pointer" }}>
      {icon} {node.name}
    </span>
  );
};

const SubTree = () => {
  const { node, isOpen } = useTreeNodeContext();
  const [childrenArr, setChildrenArr] = useState<JobCatalogItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const children = await jobCatalogApi.getChildrenByParentId(node.id);
        setChildrenArr(children);
      } catch (err) {
        setError(err as Error);
      }
    };

    if (!node.isLeaf && isOpen && childrenArr.length === 0) {
      getChildren();
    }
  }, [node.id, node.isLeaf, isOpen, childrenArr.length]);

  if (!isOpen) return null;

  return (
    <>
      {error && <p>에러발생 : 트리노드</p>}
      {childrenArr.map((childNode) => (
        <Tree.Node key={childNode.id} node={childNode}>
          <Tree.Name />
          <Tree.SubTree />
        </Tree.Node>
      ))}
    </>
  );
};

const Tree = ({ rootNode }: TreeProps) => {
  return (
    <Tree.Node node={rootNode}>
      <Tree.Name />
      <Tree.SubTree />
    </Tree.Node>
  );
};

Tree.Node = TreeNode;
Tree.Name = Name;
Tree.SubTree = SubTree;

export default Tree;
