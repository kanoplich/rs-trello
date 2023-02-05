import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Projects() {
  return (
    <>
      <div>
        {" "}
        LIST OF PROJECTS
        <Link to=":name/board">PAGE OF ONE PROJECT WITH DETAILS</Link>
      </div>
      <Outlet />
    </>
  );
}
