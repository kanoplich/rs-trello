import React from "react";
import { Routes, Route, Link, Router, Navigate } from "react-router-dom";
import { Project } from "./project/project";
import "./main.css";
import WelcomePage from "./welcome/welcome";
import WorkspacePage from "./workspace/workspace";
export function Main() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/workspace" element={WorkspacePage()} />
        <Route
          path="/projects"
          element={
            <div>
              {" "}
              LIST OF PROJECTS
              <Link to="/project/:name">PAGE OF ONE PROJECT WITH DETAILS</Link>
            </div>
          }
        />
        {/* {routes.map((item, index) => {
          return (
            <Route
              key={`${index}${item.name}`}
              path={item.path}
              element={<item.element />}
            />
          );
        })} */}
        <Route path="/project/:name" element={<Project />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
      {/* <Aside /> */}
    </main>
  );
}
//TODO: made routes simple without Array
export const routes = [
  { name: "Workspace", path: "/workspace", element: () => WorkspacePage() },
  {
    name: "Projects",
    path: "/projects",
    element: () => (
      <div>
        {" "}
        LIST OF PROJECTS
        <Link to="/project/:name">PAGE OF ONE PROJECT WITH DETAILS</Link>
      </div>
    ),
  },
];
