import React from "react";
import "./normalize.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./main/main";
import WelcomePage from "./main/welcome/welcome";
import WorkspacePage from "./main/workspace/workspace";
import Projects from "./main/projects/projects";
import Project from "./main/project/project";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<WelcomePage />} />
          <Route path="workspace" element={<WorkspacePage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:name/*" element={<Project />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
