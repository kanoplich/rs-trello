import React from "react";
import { Outlet } from "react-router-dom";
import "./main.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import WorkspacePage from "./workspace/workspace";
import Projects from "./projects/projects";
export function Main() {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
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
