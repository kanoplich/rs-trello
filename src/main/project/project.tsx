import React from "react";
import "./project.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Breadcrumbs, Box, IconButton } from "@mui/material/";
import Add from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchField from "../../components/searchField";
import { routes } from "../main";
import { ProjectAside } from "./components/projectAside";
import { ProjectBoard } from "./components/projectBoard";
import { useSelector } from "react-redux";
import { getProjectsProjects } from "../../store/selectors";


export default function Project() {

  const [isBoardOpen, setBoardOpen] = useState(false);
  const projects = useSelector(getProjectsProjects);
  const { name } = useParams();


  const boards = projects.filter(item => {
    if(item.name === name) {
      return item.columns
    }
  });


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
            {boards[0].name}
          </Link>
        </Breadcrumbs>
        <h2 className="projects__title">{boards[0].key} board</h2>
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
          gap: "20px",
          paddingBottom: "10px",
          paddingTop: "2px",
          overflow: "auto",
        }}>
          <div className="board__container">
            {
              boards[0].columns.map((elem) => <ProjectBoard data={elem} key={elem.id}/>)
            }
          </div>
          <IconButton
            sx={{
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
