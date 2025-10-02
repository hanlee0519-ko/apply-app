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
    try {
      const response = await fetch("/data/job-catalogs/root.json");
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data: RootResponse = await response.json();

      return data.root;
    } catch (error) {
      throw error;
    }
  },

  getChildrenByParentId: async (
    parentId: string
  ): Promise<JobCatalogItem[]> => {
    try {
      const response = await fetch(
        `/data/job-catalogs/children/${parentId}.json`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data: ChildrenResponse = await response.json();

      return data.children;
    } catch (error) {
      throw error;
    }
  },
};
