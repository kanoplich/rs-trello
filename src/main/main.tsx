import React from "react";
import { Outlet } from "react-router-dom";
import "./main.css";
import WorkspacePage from "./workspace/workspace";
import Projects from "./projects/projects";
export function Main() {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
}
export const routes = [
  { name: "Workspace", path: "/workspace", element: () => WorkspacePage() },
  {
    name: "Projects",
    path: "/projects",
    element: <Projects />,
  },
];
