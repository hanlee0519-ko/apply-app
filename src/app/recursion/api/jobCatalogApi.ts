import { wrapPromise } from "./resource";

export interface JobCatalogItem {
  id: string;
  name: string;
  parentId: string | null;
  isLeaf: boolean;
}

export interface RootResponse {
  root: JobCatalogItem[];
}

export interface ChildrenResponse {
  parentId: string;
  children: JobCatalogItem[];
}

export const jobCatalogApi = {
  getRoot: async (): Promise<JobCatalogItem[]> => {
    const response = await fetch("/data/job-catalogs/root.json");

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data: RootResponse = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return data.root;
  },

  getChildrenByParentId: async (
    parentId: string
  ): Promise<JobCatalogItem[]> => {
    const response = await fetch(
      `/data/job-catalogs/children/${parentId}.json`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data: ChildrenResponse = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return data.children;
  },
};

export const createRootResource = () => {
  return wrapPromise(jobCatalogApi.getRoot());
};

export const createChildrenResource = (parentId: string) => {
  return wrapPromise(jobCatalogApi.getChildrenByParentId(parentId));
};
