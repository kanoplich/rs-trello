import React from "react";
import "./normalize.css";
import "./App.css";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Main } from "./main/main";
import { Navigate, Route, Routes } from "react-router-dom";
import WorkspacePage from "./main/workspace/workspace";
import Projects from "./main/projects/projects";
import Project from "./main/project/project";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="workspace" element={<WorkspacePage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:name/*" element={<Project />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
