import React from "react";
import "./project.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Breadcrumbs, Box, IconButton, Button } from "@mui/material/";
import Add from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchField from "../../components/searchField";
import { routes } from "../main";
import { ProjectAside } from "./projectAside";
import { ProjectBoard } from "./projectBoard";
import { BoardType } from "./projectBoard";

export const boards: BoardType[] = [
  { key: 1, title: "TO DO" },
  { key: 2, title: "IN PROGRESS" },
  { key: 3, title: "DONE" },
]
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
        <Box sx={{ 
          display: "flex",
          alignItems: "baseline",
          gap: "20px"
          }}>
        <div className="board__container">
          {
            boards.map((elem) => <ProjectBoard key={elem.key} title={elem.title} />)
          }
        </div>
        <IconButton sx={{
            borderRadius: "3px",
          }}>
            <Add fontSize="medium" />
          </IconButton>
        </Box>
      </Container>
      <ProjectAside
        boardOpen={isBoardOpen}
        closeBoard={() => setBoardOpen(false)}
      />
    </>
  );
}
