import React from "react";
import { useState } from "react";
import "./project.css";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Breadcrumbs, Box, IconButton } from "@mui/material/";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchField from "../../components/searchField";
import { routes } from "../main";
import { ProjectAside } from "../../components/ProjectAside";

export default function Project() {

  const [isBoardOpen, setBoardOpen] = useState(false);

  return (
    <>
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: 2 }}>
          <Link className="breadcrumbs__link"
            to={routes[1].path}
          >
            Projects
          </Link>
          <Link className="breadcrumbs__link"
            to="projects/:name/*"
          >
            data
          </Link>
        </Breadcrumbs>
        <h2 className="projects__title">KEY board</h2>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <IconButton onClick={() => setBoardOpen(true)}>
            <AddCircleIcon />
          </IconButton>
          <SearchField />
        </Box>
        <div className="board__container">
          <Box className="board__background"></Box>
          <Box className="board__background"></Box>
          <Box className="board__background"></Box>
        </div>
      </Container>
      <ProjectAside
        boardOpen={isBoardOpen}
        closeBoard={() => setBoardOpen(false)}
      />
      {/* <aside className="aside">
        <div>ADD PROJECT NAME with img?</div>
        PLANNING
        <div>
          <Link to="board">BOARD</Link>
        </div>
        <div>
          <Link to="roadmap">ROADMAP</Link>
        </div>
      </aside>
      <section className="main-section">
        <Routes>
          <Route path="board" element={<div>BOARDS</div>} />
          <Route path="roadmap" element={<div>ROADMAP</div>} />
        </Routes>
      </section> */}
    </>
  );
}
