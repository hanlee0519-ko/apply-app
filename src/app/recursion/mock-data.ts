export interface nodeItem {
  name: string;
  type: "file" | "folder";
  children?: nodeItem[];
}

export const mockData: nodeItem = {
  name: "web-project",
  type: "folder",
  children: [
    { name: "index.html", type: "file" },
    { name: "styles.css", type: "file" },
    {
      name: "java-script",
      type: "folder",
      children: [
        { name: "main.js", type: "file" },
        { name: "utils.js", type: "file" },
        {
          name: "modules",
          type: "folder",
          children: [
            { name: "auth.js", type: "file" },
            { name: "api.js", type: "file" },
          ],
        },
      ],
    },
    {
      name: "images",
      type: "folder",
      children: [
        { name: "logo.png", type: "file" },
        { name: "background.jpg", type: "file" },
      ],
    },
  ],
};
