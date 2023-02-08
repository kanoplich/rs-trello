import React from "react";
import { Link, Outlet } from "react-router-dom";
import SearchField from "../../components/searchField";
import "./projects.css";
import ProjectsTable from "./tableProjects";
import CreateBtn from "../../components/createProjectBtn";

export default function Projects() {
  return (
    <>
      <div className="projects_main">
        <div className="projects_header">
          <h2>Projects</h2>
          <div className="project_btn">
            <SearchField/>
            <CreateBtn text={"Create"} />
          </div>
        </div> 
        <ProjectsTable/>
        <></>
        <Link to=":name/board">PAGE OF ONE PROJECT WITH DETAILS</Link>
        <div> CREATE YOUR FIRST PROJECT!</div>
      </div>
      <Outlet />
    </>
  );
}
