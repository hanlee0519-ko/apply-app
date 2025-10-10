import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/data/job-catalogs/root.json", () => {
    return HttpResponse.json({
      root: [
        {
          id: "frontend",
          name: "프론트엔드",
          parentId: null,
          isLeaf: false,
        },
        {
          id: "backend",
          name: "백엔드",
          parentId: null,
          isLeaf: false,
        },
        {
          id: "mobile",
          name: "모바일",
          parentId: null,
          isLeaf: true,
        },
      ],
    });
  }),

  http.get("/data/job-catalogs/children/frontend.json", () => {
    return HttpResponse.json({
      parentId: "frontend",
      children: [
        {
          id: "react-dev",
          name: "React 개발자",
          parentId: "frontend",
          isLeaf: false,
        },
        {
          id: "vue-dev",
          name: "Vue 개발자",
          parentId: "frontend",
          isLeaf: true,
        },
        {
          id: "angular-dev",
          name: "Angular 개발자",
          parentId: "frontend",
          isLeaf: true,
        },
      ],
    });
  }),

  http.get("/data/job-catalogs/children/react-dev.json", () => {
    return HttpResponse.json({
      parentId: "react-dev",
      children: [
        {
          id: "junior-react-dev",
          name: "주니어 React 개발자",
          parentId: "react-dev",
          isLeaf: true,
        },
        {
          id: "senior-react-dev",
          name: "시니어 React 개발자",
          parentId: "react-dev",
          isLeaf: true,
        },
      ],
    });
  }),

  http.get("/data/job-catalogs/children/backend.json", () => {
    return HttpResponse.json({
      parentId: "backend",
      children: [
        {
          id: "java-dev",
          name: "Java 개발자",
          parentId: "backend",
          isLeaf: false,
        },
        {
          id: "python-dev",
          name: "Python 개발자",
          parentId: "backend",
          isLeaf: true,
        },
        {
          id: "nodejs-dev",
          name: "Node.js 개발자",
          parentId: "backend",
          isLeaf: true,
        },
      ],
    });
  }),

  http.get("/data/job-catalogs/children/java-dev.json", () => {
    return HttpResponse.json({
      parentId: "java-dev",
      children: [
        {
          id: "junior-java-dev",
          name: "주니어 Java 개발자",
          parentId: "java-dev",
          isLeaf: true,
        },
        {
          id: "senior-java-dev",
          name: "시니어 Java 개발자",
          parentId: "java-dev",
          isLeaf: true,
        },
      ],
    });
  }),
];
