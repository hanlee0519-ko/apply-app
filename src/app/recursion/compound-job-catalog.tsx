"use client";

type JobCatalogContextType = {
  node: JobCatalogItem;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (nodeName: string) => void;
};

type JobCatalogNodeProps = {
  node: JobCatalogItem;
  children: ReactNode;
  onSelect: (nodeName: string) => void;
};

type JobCatalogProps = {
  node: JobCatalogItem;
  onSelect: (nodeName: string) => void;
};

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { type JobCatalogItem, jobCatalogApi } from "./api/jobCatalogApi";

const JobCatalogContext = createContext<JobCatalogContextType | null>(null);

function useJobCatalogContext(): JobCatalogContextType {
  const context = useContext(JobCatalogContext);
  if (!context) {
    throw new Error("JobCatalog 컴포넌트 내부에서만 사용 가능합니다");
  }
  return context;
}

const JobCatalogNode = ({ node, children, onSelect }: JobCatalogNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  const value: JobCatalogContextType = {
    node,
    isOpen,
    onToggle: handleToggle,
    onSelect,
  };

  return (
    <JobCatalogContext.Provider value={value}>
      <article className="ml-10">{children}</article>
    </JobCatalogContext.Provider>
  );
};

const JobCatalogLabel = () => {
  const { node, isOpen, onToggle, onSelect } = useJobCatalogContext();
  const icon = node.isLeaf ? "▷" : isOpen ? "▼" : "▶";

  const handleSelect = () => onSelect(node.name);

  return (
    <span
      onClick={node.isLeaf ? handleSelect : onToggle}
      style={{ cursor: "pointer" }}
    >
      {icon} {node.name}
    </span>
  );
};

const JobCatalogChildren = () => {
  const { node, isOpen, onSelect } = useJobCatalogContext();
  const [childrenArr, setChildrenArr] = useState<JobCatalogItem[]>([]);
  const [isError, setIsError] = useState<Error | null>(null);

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

    if (!node.isLeaf && isOpen && childrenArr.length === 0) {
      getChildren();
    }
  }, [node.id, node.isLeaf, isOpen, childrenArr.length]);

  if (!isOpen) return null;

  if (isError) {
    return <p>{`Error 발생 ${isError.message}`}</p>;
  }

  return (
    <>
      {childrenArr.map((childNode) => (
        <JobCatalog.Node
          key={childNode.id}
          node={childNode}
          onSelect={onSelect}
        >
          <JobCatalog.Label />
          <JobCatalog.Children />
        </JobCatalog.Node>
      ))}
    </>
  );
};

const JobCatalog = ({ node, onSelect }: JobCatalogProps) => {
  return (
    <JobCatalog.Node node={node} onSelect={onSelect}>
      <JobCatalog.Label />
      <JobCatalog.Children />
    </JobCatalog.Node>
  );
};

JobCatalog.Node = JobCatalogNode;
JobCatalog.Label = JobCatalogLabel;
JobCatalog.Children = JobCatalogChildren;

export default JobCatalog;
