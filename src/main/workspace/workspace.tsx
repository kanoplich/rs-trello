import React from "react";
import "./workspace.css"
import { Container } from "@mui/material/";
import { useSelector } from "react-redux";
import { getProjects } from "../../store/selectors";
import { EmptyCardProject } from "./EmptyCardProject";
import { CardProjectPage } from "./CardProjectPage";

export default function WorkspacePage() {

  const projects = useSelector(getProjects);

  return (
    <>
      <section className="workspace-page">
        <Container maxWidth="xl">
          <h1 className="workspace__title">Workspace</h1>

          {!projects.length ? <EmptyCardProject /> : <CardProjectPage />}

        </Container>
      </section>
    </>
  );
}
